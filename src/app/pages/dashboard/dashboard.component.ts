import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { forkJoin } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import {
  BootstrapData,
  DashboardProject,
  DashboardSummary,
  FinanceAccount,
  FinanceCategory,
  FinanceTransaction,
  NoteType,
  PersonalDashboardService,
  PersonalNote,
  PersonalTask,
  TaskPriority,
  TaskStatus,
  TransactionType,
} from '../../services/personal-dashboard.service';

type DashboardView = 'overview' | 'today' | 'week' | 'career' | 'finance';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ButtonModule,
    CardModule,
    InputNumberModule,
    InputTextModule,
    MessageModule,
    SelectModule,
    TagModule,
    TextareaModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  protected readonly isLoading = signal(true);
  protected readonly error = signal('');
  protected readonly activeView = signal<DashboardView>('overview');
  protected readonly isQuickActionsOpen = signal(false);
  protected readonly searchTerm = signal('');
  protected readonly bootstrapData = signal<BootstrapData | null>(null);
  protected readonly summary = signal<DashboardSummary | null>(null);
  protected readonly tasks = signal<PersonalTask[]>([]);
  protected readonly notes = signal<PersonalNote[]>([]);
  protected readonly accounts = signal<FinanceAccount[]>([]);
  protected readonly categories = signal<FinanceCategory[]>([]);
  protected readonly transactions = signal<FinanceTransaction[]>([]);

  protected readonly todayKey = this.toDateInputValue(new Date());
  protected readonly nextWeekKey = this.toDateInputValue(this.addDays(new Date(), 7));
  protected readonly viewOptions: { label: string; value: DashboardView; icon: string }[] = [
    { label: 'Resumen', value: 'overview', icon: 'pi pi-th-large' },
    { label: 'Hoy', value: 'today', icon: 'pi pi-sun' },
    { label: 'Semana', value: 'week', icon: 'pi pi-calendar' },
    { label: 'Carrera', value: 'career', icon: 'pi pi-briefcase' },
    { label: 'Finanzas', value: 'finance', icon: 'pi pi-wallet' },
  ];
  protected readonly priorityOptions = [
    { label: 'Urgente', value: 'URGENT' },
    { label: 'Alta', value: 'HIGH' },
    { label: 'Normal', value: 'NORMAL' },
    { label: 'Baja', value: 'LOW' },
  ];
  protected readonly statusOptions = [
    { label: 'Por hacer', value: 'TODO' },
    { label: 'En progreso', value: 'IN_PROGRESS' },
  ];
  protected readonly transactionTypeOptions = [
    { label: 'Gasto', value: 'EXPENSE' },
    { label: 'Ingreso', value: 'INCOME' },
  ];
  protected readonly noteTypeOptions = [
    { label: 'Nota rápida', value: 'BRAIN_DUMP' },
    { label: 'Idea', value: 'IDEA' },
    { label: 'Importante', value: 'IMPORTANT' },
    { label: 'Reflexión', value: 'REFLECTION' },
  ];
  protected readonly accountTypeOptions = [
    { label: 'Efectivo', value: 'CASH' },
    { label: 'Banco', value: 'BANK' },
    { label: 'Billetera', value: 'DIGITAL_WALLET' },
    { label: 'Tarjeta', value: 'CREDIT_CARD' },
  ];

  protected newTaskTitle = '';
  protected newTaskDescription = '';
  protected newTaskPriority: TaskPriority = 'HIGH';
  protected newTaskStatus: TaskStatus = 'TODO';
  protected newTaskAreaId = '';
  protected newTaskScheduledDate = this.todayKey;
  protected newTaskDueDate = '';
  protected newTaskMinutes: number | null = 30;
  protected newNoteTitle = '';
  protected newNoteContent = '';
  protected newNoteType: NoteType = 'BRAIN_DUMP';
  protected newNoteAreaId = '';
  protected pinNewNote = true;
  protected editingNoteId: string | null = null;
  protected transactionType: TransactionType = 'EXPENSE';
  protected transactionAmount: number | null = null;
  protected transactionDescription = '';
  protected transactionCategoryId = '';
  protected transactionAccountId = '';
  protected newAccountName = '';
  protected newAccountType = 'DIGITAL_WALLET';
  protected newAccountInitialBalance: number | null = 0;
  protected newCategoryName = '';
  protected newCategoryType: TransactionType = 'EXPENSE';
  protected newCategoryBudget: number | null = null;

  protected readonly openTasks = computed(() => this.filteredTasks().filter((task) => task.status !== 'DONE'));
  protected readonly todayTasks = computed(() =>
    this.openTasks().filter((task) => this.dateMatches(task.scheduledDate, this.todayKey) || this.dateMatches(task.dueDate, this.todayKey)),
  );
  protected readonly weekTasks = computed(() =>
    this.openTasks().filter((task) => {
      const date = this.getTaskDateKey(task);
      return Boolean(date && date >= this.todayKey && date <= this.nextWeekKey);
    }),
  );
  protected readonly overdueTasks = computed(() =>
    this.openTasks().filter((task) => {
      const date = this.toDateKey(task.dueDate);
      return Boolean(date && date < this.todayKey);
    }),
  );
  protected readonly importantNotes = computed(() => this.filteredNotes().filter((note) => note.pinned || note.type === 'IMPORTANT'));
  protected readonly inboxNotes = computed(() => this.filteredNotes().filter((note) => note.type === 'BRAIN_DUMP'));
  protected readonly visibleTransactions = computed(() => this.transactions().slice(0, 12));
  protected readonly filteredCategories = computed(() => this.categories().filter((category) => category.type === this.transactionType));
  protected readonly monthIncome = computed(() => this.summary()?.finance?.monthIncome ?? this.currentMonthTotal('INCOME'));
  protected readonly monthExpenses = computed(() => this.summary()?.finance?.monthExpenses ?? this.currentMonthTotal('EXPENSE'));
  protected readonly monthBalance = computed(() => this.summary()?.finance?.monthBalance ?? this.monthIncome() - this.monthExpenses());
  protected readonly categoryBudgets = computed(() =>
    this.categories()
      .filter((category) => category.type === 'EXPENSE' && Number(category.monthlyBudget ?? 0) > 0)
      .map((category) => {
        const spent = this.transactions()
          .filter(
            (transaction) =>
              transaction.type === 'EXPENSE' &&
              this.isTransactionPaid(transaction) &&
              transaction.category?.id === category.id &&
              this.isCurrentMonth(transaction.date),
          )
          .reduce((total, transaction) => total + Number(transaction.amount), 0);
        const budget = Number(category.monthlyBudget ?? 0);
        return { ...category, spent, budget, usage: Math.min(100, Math.round((spent / budget) * 100)) };
      }),
  );
  protected readonly financeBalance = computed(() => {
    const movementBalance = this.transactions().reduce((total, transaction) => {
      const amount = Number(transaction.amount);
      if (transaction.type === 'EXPENSE' && !this.isTransactionPaid(transaction)) return total;
      return transaction.type === 'INCOME' ? total + amount : total - amount;
    }, 0);
    const initialBalance = this.accounts().reduce((total, account) => total + Number(account.initialBalance ?? 0), 0);
    return initialBalance + movementBalance;
  });
  protected readonly activeProjects = computed(() => (this.summary()?.projects ?? []) as DashboardProject[]);
  protected readonly careerFocus = computed(() =>
    this.openTasks().filter((task) => ['Carrera', 'Trabajo', 'Programacion', 'Programación', 'Proyectos'].includes(task.area?.name ?? '')),
  );

  constructor(
    protected readonly authService: AuthService,
    private readonly dashboardService: PersonalDashboardService,
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  protected loadDashboard(): void {
    this.isLoading.set(true);
    this.error.set('');

    forkJoin({
      bootstrap: this.dashboardService.bootstrap(),
      summary: this.dashboardService.summary(),
      tasks: this.dashboardService.tasks(),
      notes: this.dashboardService.notes(),
      finance: this.dashboardService.finance(),
    }).subscribe({
      next: ({ bootstrap, summary, tasks, notes, finance }) => {
        this.bootstrapData.set(bootstrap);
        this.summary.set(summary);
        this.tasks.set(tasks);
        this.notes.set(notes);
        this.accounts.set(finance.accounts);
        this.categories.set(finance.categories);
        this.transactions.set(finance.transactions);
        this.transactionAccountId = finance.accounts[0]?.id ?? '';
        this.transactionCategoryId = finance.categories.find((category) => category.type === this.transactionType)?.id ?? '';
        this.newTaskAreaId = bootstrap.areas[0]?.id ?? '';
        this.newNoteAreaId = bootstrap.areas[0]?.id ?? '';
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('No pude cargar el dashboard. Revisá el backend o volvé a iniciar sesión.');
        this.isLoading.set(false);
      },
    });
  }

  protected setView(view: DashboardView): void {
    this.activeView.set(view);
    this.isQuickActionsOpen.set(false);
  }

  protected updateSearch(value: string): void {
    this.searchTerm.set(value.trim().toLowerCase());
  }

  protected toggleQuickActions(): void {
    this.isQuickActionsOpen.update((isOpen) => !isOpen);
  }

  protected refreshFromMenu(): void {
    this.isQuickActionsOpen.set(false);
    this.loadDashboard();
  }

  protected createTask(): void {
    const title = this.newTaskTitle.trim();
    if (!title) return;

    this.dashboardService
      .createTask({
        title,
        description: this.newTaskDescription.trim() || undefined,
        priority: this.newTaskPriority,
        status: this.newTaskStatus,
        areaId: this.newTaskAreaId || undefined,
        scheduledDate: this.toIsoFromInput(this.newTaskScheduledDate),
        dueDate: this.toIsoFromInput(this.newTaskDueDate),
        estimatedMinutes: this.newTaskMinutes ?? undefined,
      })
      .subscribe({
        next: (task) => {
          this.tasks.set([task, ...this.tasks()]);
          this.newTaskTitle = '';
          this.newTaskDescription = '';
          this.newTaskMinutes = 30;
          this.refreshSummary();
        },
        error: () => this.error.set('No pude crear la tarea.'),
      });
  }

  protected startTask(task: PersonalTask): void {
    this.updateTaskStatus(task, 'IN_PROGRESS');
  }

  protected completeTask(task: PersonalTask): void {
    this.updateTaskStatus(task, 'DONE');
  }

  protected archiveNote(note: PersonalNote): void {
    this.dashboardService.updateNote(note.id, { pinned: false } as Partial<PersonalNote>).subscribe({
      next: (updated) => this.notes.set(this.notes().map((item) => (item.id === updated.id ? updated : item))),
      error: () => this.error.set('No pude actualizar la nota.'),
    });
  }

  protected saveNote(): void {
    const content = this.newNoteContent.trim();
    if (!content) return;

    const payload = {
      title: this.newNoteTitle.trim() || undefined,
      content,
      type: this.newNoteType,
      pinned: this.pinNewNote,
      areaId: this.newNoteAreaId || undefined,
    };
    const wasEditing = Boolean(this.editingNoteId);
    const request$ = this.editingNoteId ? this.dashboardService.updateNote(this.editingNoteId, payload) : this.dashboardService.createNote(payload);

    request$.subscribe({
      next: (note) => {
        if (wasEditing) {
          this.notes.set(this.notes().map((item) => (item.id === note.id ? note : item)));
        } else {
          this.notes.set([note, ...this.notes()]);
        }

        this.resetNoteForm();
        this.refreshSummary();
      },
      error: () => this.error.set(wasEditing ? 'No pude actualizar la nota.' : 'No pude guardar la nota.'),
    });
  }

  protected editNote(note: PersonalNote): void {
    this.editingNoteId = note.id;
    this.newNoteTitle = note.title ?? '';
    this.newNoteContent = note.content;
    this.newNoteType = note.type;
    this.newNoteAreaId = note.area?.id ?? '';
    this.pinNewNote = note.pinned;
  }

  protected cancelNoteEdit(): void {
    this.resetNoteForm();
  }

  protected deleteNote(note: PersonalNote): void {
    const label = note.title || note.content;
    if (!window.confirm(`¿Borrar "${label}"?`)) return;

    this.dashboardService.deleteNote(note.id).subscribe({
      next: () => {
        this.notes.set(this.notes().filter((item) => item.id !== note.id));
        if (this.editingNoteId === note.id) this.resetNoteForm();
        this.refreshSummary();
      },
      error: () => this.error.set('No pude borrar la nota.'),
    });
  }

  protected createTransaction(): void {
    if (!this.transactionAmount || this.transactionAmount <= 0) return;

    this.dashboardService
      .createTransaction({
        type: this.transactionType,
        amount: this.transactionAmount,
        description: this.transactionDescription.trim() || undefined,
        categoryId: this.transactionCategoryId || undefined,
      })
      .subscribe({
        next: (transaction) => {
          this.transactions.set([transaction, ...this.transactions()]);
          this.transactionAmount = null;
          this.transactionDescription = '';
          this.refreshSummary();
        },
        error: () => this.error.set('No pude cargar el movimiento.'),
      });
  }

  protected createAccount(): void {
    const name = this.newAccountName.trim();
    if (!name) return;

    this.dashboardService
      .createAccount({
        name,
        type: this.newAccountType,
        initialBalance: this.newAccountInitialBalance ?? 0,
      })
      .subscribe({
        next: (account) => {
          this.accounts.set([...this.accounts(), account]);
          this.transactionAccountId = account.id;
          this.newAccountName = '';
          this.newAccountInitialBalance = 0;
        },
        error: () => this.error.set('No pude crear la cuenta.'),
      });
  }

  protected createCategory(): void {
    const name = this.newCategoryName.trim();
    if (!name) return;

    this.dashboardService
      .createCategory({
        name,
        type: this.newCategoryType,
        monthlyBudget: this.newCategoryBudget ?? undefined,
      })
      .subscribe({
        next: (category) => {
          this.categories.set([...this.categories(), category]);
          if (category.type === this.transactionType) this.transactionCategoryId = category.id;
          this.newCategoryName = '';
          this.newCategoryBudget = null;
        },
        error: () => this.error.set('No pude crear la categoría.'),
      });
  }

  protected setTransactionType(type: TransactionType): void {
    this.transactionType = type;
    const category = this.categories().find((item) => item.type === type);
    this.transactionCategoryId = category?.id ?? '';
  }

  protected priorityLabel(priority: TaskPriority): string {
    return this.priorityOptions.find((option) => option.value === priority)?.label ?? priority;
  }

  protected statusLabel(status: TaskStatus): string {
    if (status === 'IN_PROGRESS') return 'En progreso';
    if (status === 'DONE') return 'Hecha';
    if (status === 'ARCHIVED') return 'Archivada';
    return 'Por hacer';
  }

  protected isTransactionPaid(transaction: FinanceTransaction): boolean {
    return transaction.type !== 'EXPENSE' || transaction.isPaid !== false;
  }

  protected dateLabel(value?: string | null): string {
    const date = value ? new Date(value) : null;
    if (!date || Number.isNaN(date.getTime())) return 'Sin fecha';
    return new Intl.DateTimeFormat('es-AR', { day: '2-digit', month: 'short' }).format(date);
  }

  protected logout(): void {
    this.authService.logout();
  }

  private updateTaskStatus(task: PersonalTask, status: TaskStatus): void {
    this.dashboardService.updateTask(task.id, { status }).subscribe({
      next: (updated) => {
        this.tasks.set(this.tasks().map((item) => (item.id === updated.id ? updated : item)));
        this.refreshSummary();
      },
      error: () => this.error.set('No pude actualizar la tarea.'),
    });
  }

  private resetNoteForm(): void {
    this.editingNoteId = null;
    this.newNoteTitle = '';
    this.newNoteContent = '';
    this.newNoteType = 'BRAIN_DUMP';
    this.pinNewNote = true;
  }

  private filteredTasks(): PersonalTask[] {
    const query = this.searchTerm();
    if (!query) return this.tasks();
    return this.tasks().filter((task) =>
      [task.title, task.description, task.area?.name, task.priority, task.status].some((value) =>
        String(value ?? '').toLowerCase().includes(query),
      ),
    );
  }

  private filteredNotes(): PersonalNote[] {
    const query = this.searchTerm();
    if (!query) return this.notes();
    return this.notes().filter((note) =>
      [note.title, note.content, note.type, note.area?.name].some((value) => String(value ?? '').toLowerCase().includes(query)),
    );
  }

  private refreshSummary(): void {
    this.dashboardService.summary().subscribe((summary) => {
      this.summary.set(summary);
    });
  }

  private currentMonthTotal(type: TransactionType): number {
    return this.transactions()
      .filter((transaction) => transaction.type === type && this.isTransactionPaid(transaction) && this.isCurrentMonth(transaction.date))
      .reduce((total, transaction) => total + Number(transaction.amount), 0);
  }

  private getTaskDateKey(task: PersonalTask): string {
    return this.toDateKey(task.scheduledDate) || this.toDateKey(task.dueDate);
  }

  private dateMatches(value: string | null | undefined, key: string): boolean {
    return this.toDateKey(value) === key;
  }

  private toIsoFromInput(value: string): string | undefined {
    return value ? new Date(`${value}T12:00:00`).toISOString() : undefined;
  }

  private toDateKey(value: string | null | undefined): string {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    return this.toDateInputValue(date);
  }

  private toDateInputValue(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private addDays(date: Date, days: number): Date {
    const next = new Date(date);
    next.setDate(next.getDate() + days);
    return next;
  }

  private isCurrentMonth(value: string): boolean {
    const date = new Date(value);
    const now = new Date();
    return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
  }
}
