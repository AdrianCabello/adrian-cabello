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
  FinanceCategory,
  FinanceTransaction,
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
  protected readonly error = signal('');
  protected readonly message = signal('');
  protected readonly categories = signal<FinanceCategory[]>([]);
  protected readonly transactions = signal<FinanceTransaction[]>([]);

  protected transactionType: TransactionType = 'EXPENSE';
  protected amount: number | null = null;
  protected description = '';
  protected categoryId = '';

  protected readonly typeOptions: { label: string; value: TransactionType }[] = [
    { label: 'Gasto', value: 'EXPENSE' },
    { label: 'Ingreso', value: 'INCOME' },
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
  }

  protected setType(type: TransactionType): void {
    this.transactionType = type;
    this.categoryId = this.filteredCategories()[0]?.id ?? '';
    this.message.set('');
    this.error.set('');
  }

  protected saveMovement(): void {
    if (!this.amount || this.amount <= 0) {
      this.error.set('Poné un monto para guardar el movimiento.');
      return;
    }

    this.isSaving.set(true);
    this.error.set('');
    this.message.set('');

    this.dashboardService
      .createTransaction({
        type: this.transactionType,
        amount: this.amount,
        description: this.description.trim() || undefined,
        categoryId: this.categoryId || undefined,
        date: new Date().toISOString(),
      })
      .subscribe({
        next: (transaction) => {
          this.transactions.set([transaction, ...this.transactions()]);
          this.amount = null;
          this.description = '';
          this.message.set('Movimiento guardado.');
          this.isSaving.set(false);
        },
        error: () => {
          this.error.set('No pude guardar el movimiento.');
          this.isSaving.set(false);
        },
      });
  }

  protected formatMoney(value: string | number): string {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(Number(value));
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
}
