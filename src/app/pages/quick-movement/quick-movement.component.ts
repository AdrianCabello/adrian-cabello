import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import {
  DollarQuote,
  FinanceCategory,
  FinanceTransaction,
  MoneyCurrency,
  PersonalDashboardService,
  TransactionType,
} from '../../services/personal-dashboard.service';

@Component({
  selector: 'app-quick-movement',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ButtonModule, InputNumberModule, InputTextModule, SelectModule, TextareaModule],
  templateUrl: './quick-movement.component.html',
  styleUrl: './quick-movement.component.scss',
})
export class QuickMovementComponent implements OnInit {
  protected readonly isLoading = signal(true);
  protected readonly isSaving = signal(false);
  protected readonly isCreatingCategory = signal(false);
  protected readonly deletingMovementId = signal<string | null>(null);
  protected readonly error = signal('');
  protected readonly message = signal('');
  protected readonly dollarError = signal('');
  protected readonly isDollarLoading = signal(false);
  protected readonly dollarQuote = signal<DollarQuote | null>(null);
  protected readonly categories = signal<FinanceCategory[]>([]);
  protected readonly transactions = signal<FinanceTransaction[]>([]);

  protected transactionType: TransactionType = 'EXPENSE';
  protected amount: number | null = null;
  protected amountCurrency: MoneyCurrency = 'ARS';
  protected description = '';
  protected categoryId = '';
  protected newCategoryName = '';
  protected editingMovementId: string | null = null;

  protected readonly typeOptions: { label: string; value: TransactionType }[] = [
    { label: 'Gasto', value: 'EXPENSE' },
    { label: 'Ingreso', value: 'INCOME' },
  ];
  protected readonly currencyOptions: { label: string; value: MoneyCurrency }[] = [
    { label: 'Pesos', value: 'ARS' },
    { label: 'Dólares', value: 'USD' },
  ];

  protected readonly filteredCategories = computed(() => this.categories().filter((category) => category.type === this.transactionType));
  protected readonly recentTransactions = computed(() => this.transactions().slice(0, 8));

  constructor(
    private readonly dashboardService: PersonalDashboardService,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.queryParamMap.get('tipo') === 'ingreso') {
      this.transactionType = 'INCOME';
    }
    this.loadFinance();
    this.loadDollarQuote();
  }

  protected setType(type: TransactionType): void {
    this.transactionType = type;
    this.categoryId = this.filteredCategories()[0]?.id ?? '';
    this.message.set('');
    this.error.set('');
  }

  protected setCurrency(currency: MoneyCurrency): void {
    this.amountCurrency = currency;
    this.message.set('');
    this.error.set('');
  }

  protected refreshDollarQuote(): void {
    this.loadDollarQuote();
  }

  protected saveMovement(): void {
    if (!this.amount || this.amount <= 0) {
      this.error.set('Poné un monto para guardar el movimiento.');
      return;
    }

    this.isSaving.set(true);
    this.error.set('');
    this.message.set('');

    const payload = {
      type: this.transactionType,
      amount: this.amount,
      currency: this.amountCurrency,
      description: this.description.trim() || undefined,
      categoryId: this.categoryId || undefined,
    };
    const wasEditing = Boolean(this.editingMovementId);
    const request$ = this.editingMovementId
      ? this.dashboardService.updateTransaction(this.editingMovementId, payload)
      : this.dashboardService.createTransaction({ ...payload, date: new Date().toISOString() });

    request$.subscribe({
      next: (transaction) => {
        if (wasEditing) {
          this.transactions.update((transactions) =>
            transactions.map((existingTransaction) => (existingTransaction.id === transaction.id ? transaction : existingTransaction)),
          );
        } else {
          this.transactions.set([transaction, ...this.transactions()]);
        }

        this.resetForm();
        this.message.set(wasEditing ? 'Movimiento actualizado.' : 'Movimiento guardado.');
        this.isSaving.set(false);
      },
      error: () => {
        this.error.set(wasEditing ? 'No pude actualizar el movimiento.' : 'No pude guardar el movimiento.');
        this.isSaving.set(false);
      },
    });
  }

  protected editMovement(movement: FinanceTransaction): void {
    this.editingMovementId = movement.id;
    this.transactionType = movement.type;
    this.amount = Number(movement.amount);
    this.amountCurrency = movement.currency === 'USD' ? 'USD' : 'ARS';
    this.description = movement.description ?? '';
    this.categoryId = movement.category?.id ?? '';
    this.message.set('');
    this.error.set('');

    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  protected cancelEdit(): void {
    this.resetForm();
    this.message.set('');
    this.error.set('');
  }

  protected deleteMovement(movement: FinanceTransaction): void {
    const label = movement.description || movement.category?.name || 'este movimiento';
    if (!window.confirm(`¿Borrar ${label}?`)) return;

    this.deletingMovementId.set(movement.id);
    this.error.set('');
    this.message.set('');

    this.dashboardService.deleteTransaction(movement.id).subscribe({
      next: () => {
        this.transactions.update((transactions) => transactions.filter((transaction) => transaction.id !== movement.id));
        if (this.editingMovementId === movement.id) this.cancelEdit();
        this.message.set('Movimiento borrado.');
        this.deletingMovementId.set(null);
      },
      error: () => {
        this.error.set('No pude borrar el movimiento.');
        this.deletingMovementId.set(null);
      },
    });
  }

  protected createCustomCategory(): void {
    const name = this.newCategoryName.trim();
    if (!name) {
      this.error.set('Escribí un nombre para la categoría.');
      return;
    }

    const existingCategory = this.filteredCategories().find((category) => category.name.toLowerCase() === name.toLowerCase());
    if (existingCategory) {
      this.categoryId = existingCategory.id;
      this.newCategoryName = '';
      this.message.set('La categoría ya existía y quedó seleccionada.');
      this.error.set('');
      return;
    }

    this.isCreatingCategory.set(true);
    this.error.set('');
    this.message.set('');

    this.dashboardService
      .createCategory({
        name,
        type: this.transactionType,
      })
      .subscribe({
        next: (category) => {
          this.categories.set([...this.categories(), category].sort((a, b) => a.name.localeCompare(b.name, 'es')));
          this.categoryId = category.id;
          this.newCategoryName = '';
          this.message.set('Categoría creada y seleccionada.');
          this.isCreatingCategory.set(false);
        },
        error: () => {
          this.error.set('No pude crear la categoría.');
          this.isCreatingCategory.set(false);
        },
      });
  }

  protected formatMoney(value: string | number, currency: string = 'ARS'): string {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(Number(value));
  }

  protected formatQuoteDate(value: string): string {
    return new Intl.DateTimeFormat('es-AR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(value));
  }

  private loadFinance(): void {
    this.dashboardService.finance().subscribe({
      next: ({ categories, transactions }) => {
        this.categories.set(categories);
        this.transactions.set(transactions);
        this.categoryId = categories.find((category) => category.type === this.transactionType)?.id ?? '';
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('No pude cargar los datos.');
        this.isLoading.set(false);
      },
    });
  }

  private loadDollarQuote(): void {
    this.isDollarLoading.set(true);
    this.dollarError.set('');

    this.dashboardService.blueDollarQuote().subscribe({
      next: (quote) => {
        this.dollarQuote.set(quote);
        this.isDollarLoading.set(false);
      },
      error: () => {
        this.dollarError.set('No pude actualizar el dólar blue.');
        this.isDollarLoading.set(false);
      },
    });
  }

  private resetForm(): void {
    this.editingMovementId = null;
    this.amount = null;
    this.description = '';
    this.amountCurrency = 'ARS';
  }
}
