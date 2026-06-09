import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import {
  FinanceAccount,
  FinanceCategory,
  FinanceTransaction,
  PersonalDashboardService,
} from '../../services/personal-dashboard.service';

type ExpenseMode = 'daily' | 'monthly';
type ExpenseCurrency = 'ARS' | 'USD';

type ExpensePreset = {
  name: string;
  mode: ExpenseMode;
  icon: string;
  hint: string;
};

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ButtonModule, InputTextModule, TextareaModule],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss',
})
export class ExpensesComponent implements OnInit {
  protected readonly isLoading = signal(true);
  protected readonly isSaving = signal(false);
  protected readonly message = signal('');
  protected readonly error = signal('');
  protected readonly mode = signal<ExpenseMode>('daily');
  protected readonly categories = signal<FinanceCategory[]>([]);
  protected readonly accounts = signal<FinanceAccount[]>([]);
  protected readonly transactions = signal<FinanceTransaction[]>([]);

  protected amount = '';
  protected currency: ExpenseCurrency = 'ARS';
  protected selectedCategoryName = 'Comida';
  protected note = '';

  protected readonly presets: ExpensePreset[] = [
    { name: 'Comida', mode: 'daily', icon: 'pi pi-shopping-bag', hint: 'super, kiosco, delivery' },
    { name: 'Salidas a bailar', mode: 'daily', icon: 'pi pi-star', hint: 'previa, boliche, entrada' },
    { name: 'Salidas a comer', mode: 'daily', icon: 'pi pi-sparkles', hint: 'resto, cafe, juntada' },
    { name: 'Auto / nafta', mode: 'daily', icon: 'pi pi-car', hint: 'nafta, lavado, peaje' },
    { name: 'Servicios', mode: 'monthly', icon: 'pi pi-bolt', hint: 'internet, luz, gas' },
    { name: 'Tarjeta papa', mode: 'monthly', icon: 'pi pi-credit-card', hint: 'resumen mensual' },
    { name: 'Tarjeta Mercado Pago', mode: 'monthly', icon: 'pi pi-wallet', hint: 'resumen mensual' },
  ];

  protected readonly visiblePresets = computed(() => this.presets.filter((preset) => preset.mode === this.mode()));
  protected readonly recentExpenses = computed(() =>
    this.transactions()
      .filter((transaction) => transaction.type === 'EXPENSE')
      .slice(0, 8),
  );

  constructor(private readonly dashboardService: PersonalDashboardService) {}

  ngOnInit(): void {
    this.loadFinance();
  }

  protected setMode(mode: ExpenseMode): void {
    this.mode.set(mode);
    this.selectedCategoryName = this.visiblePresets()[0]?.name ?? 'Comida';
    this.message.set('');
    this.error.set('');
  }

  protected selectCategory(categoryName: string): void {
    this.selectedCategoryName = categoryName;
  }

  protected setCurrency(currency: ExpenseCurrency): void {
    this.currency = currency;
    this.message.set('');
    this.error.set('');
  }

  protected appendDigit(value: string): void {
    if (value === ',' || value === '.') {
      if (this.amount.includes(',')) return;
      this.amount = this.amount ? `${this.amount},` : '0,';
      return;
    }

    const clean = this.amount.replace(/^0+(?=\d)/, '');
    this.amount = `${clean}${value}`;
  }

  protected backspace(): void {
    this.amount = this.amount.slice(0, -1);
  }

  protected clearAmount(): void {
    this.amount = '';
  }

  protected saveExpense(): void {
    const parsedAmount = this.parseAmount(this.amount);
    if (!parsedAmount || parsedAmount <= 0) {
      this.error.set('Poné un monto para guardar el gasto.');
      return;
    }

    this.isSaving.set(true);
    this.error.set('');
    this.message.set('');

    this.ensureCategory(this.selectedCategoryName)
      .then((category) => {
        this.dashboardService
          .createTransaction({
            type: 'EXPENSE',
            amount: parsedAmount,
            currency: this.currency,
            description: this.buildDescription(),
            categoryId: category.id,
            accountId: this.accounts()[0]?.id,
            date: new Date().toISOString(),
          })
          .subscribe({
            next: (transaction) => {
              this.transactions.set([transaction, ...this.transactions()]);
              this.amount = '';
              this.note = '';
              this.currency = 'ARS';
              this.message.set('Gasto guardado.');
              this.isSaving.set(false);
            },
            error: () => {
              this.error.set('No pude guardar el gasto.');
              this.isSaving.set(false);
            },
          });
      })
      .catch(() => undefined);
  }

  protected formatMoney(value: string | number, currency: string = 'ARS'): string {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(Number(value));
  }

  private loadFinance(): void {
    this.dashboardService.finance().subscribe({
      next: ({ accounts, categories, transactions }) => {
        this.accounts.set(accounts);
        this.categories.set(categories);
        this.transactions.set(transactions);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('No pude cargar tus gastos.');
        this.isLoading.set(false);
      },
    });
  }

  private ensureCategory(name: string): Promise<FinanceCategory> {
    const existing = this.categories().find((category) => category.type === 'EXPENSE' && category.name.toLowerCase() === name.toLowerCase());
    if (existing) return Promise.resolve(existing);

    return new Promise((resolve, reject) => {
      this.dashboardService.createCategory({ name, type: 'EXPENSE' }).subscribe({
        next: (category) => {
          this.categories.set([...this.categories(), category]);
          resolve(category);
        },
        error: () => {
          this.error.set('No pude crear la categoría.');
          this.isSaving.set(false);
          reject();
        },
      });
    });
  }

  private buildDescription(): string {
    const suffix = this.note.trim();
    return suffix ? `${this.selectedCategoryName} - ${suffix}` : this.selectedCategoryName;
  }

  private parseAmount(value: string): number {
    return Number(value.replace(/\./g, '').replace(',', '.'));
  }
}
