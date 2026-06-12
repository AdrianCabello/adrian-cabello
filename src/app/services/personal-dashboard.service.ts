import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getApiBaseUrl } from './api-url';

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE' | 'ARCHIVED';
export type TaskPriority = 'URGENT' | 'HIGH' | 'NORMAL' | 'LOW';
export type TransactionType = 'INCOME' | 'EXPENSE';
export type MoneyCurrency = 'ARS' | 'USD';

export interface DollarQuote {
  compra: number;
  venta: number;
  casa: string;
  nombre: string;
  moneda: string;
  fechaActualizacion: string;
}

export interface LifeArea {
  id: string;
  name: string;
  color?: string | null;
  icon?: string | null;
  order?: number;
}

export interface PersonalTask {
  id: string;
  title: string;
  description?: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string | null;
  scheduledDate?: string | null;
  estimatedMinutes?: number | null;
  area?: LifeArea | null;
}

export type NoteType = 'BRAIN_DUMP' | 'IDEA' | 'IMPORTANT' | 'REFLECTION';

export interface PersonalNote {
  id: string;
  title?: string | null;
  content: string;
  type: NoteType;
  pinned: boolean;
  createdAt: string;
  area?: LifeArea | null;
}

export interface FinanceCategory {
  id: string;
  name: string;
  type: TransactionType;
  color?: string | null;
  monthlyBudget?: string | number | null;
}

export interface FinanceAccount {
  id: string;
  name: string;
  type: string;
  currency: string;
  initialBalance?: string | number | null;
}

export interface FinanceTransaction {
  id: string;
  type: TransactionType;
  amount: string | number;
  currency: string;
  date: string;
  isPaid?: boolean;
  description?: string | null;
  merchant?: string | null;
  category?: FinanceCategory | null;
  account?: FinanceAccount | null;
}

export interface FinanceTransactionPayload {
  type: TransactionType;
  amount: number;
  currency?: string;
  isPaid?: boolean;
  description?: string;
  date?: string;
  categoryId?: string;
  accountId?: string;
}

export interface DashboardProject {
  id: string;
  name: string;
  description?: string | null;
  status: string;
  url?: string | null;
  demoUrl?: string | null;
  technologies?: string[] | null;
  gallery?: { id: string; url: string }[];
  coverImage?: { id: string; url: string } | null;
}

export interface DashboardSummary {
  tasks: {
    today: PersonalTask[];
    overdue: PersonalTask[];
    openCount: number;
  };
  notes: {
    pinned: PersonalNote[];
  };
  finance: {
    monthIncome: number;
    monthExpenses: number;
    monthBalance: number;
    recentTransactions: FinanceTransaction[];
  };
  projects: DashboardProject[];
}

export interface BootstrapData {
  client: {
    id: string;
    name: string;
    email: string;
  };
  areas: LifeArea[];
  accounts: FinanceAccount[];
  categories: FinanceCategory[];
}

@Injectable({
  providedIn: 'root',
})
export class PersonalDashboardService {
  private readonly apiBaseUrl = getApiBaseUrl();

  constructor(private readonly http: HttpClient) {}

  bootstrap(): Observable<BootstrapData> {
    return this.http.get<BootstrapData>(`${this.apiBaseUrl}/personal/bootstrap`);
  }

  summary(): Observable<DashboardSummary> {
    return this.http.get<DashboardSummary>(`${this.apiBaseUrl}/personal/summary`);
  }

  tasks(): Observable<PersonalTask[]> {
    return this.http.get<PersonalTask[]>(`${this.apiBaseUrl}/personal/tasks`);
  }

  createTask(payload: {
    title: string;
    description?: string;
    priority?: TaskPriority;
    status?: TaskStatus;
    dueDate?: string;
    scheduledDate?: string;
    estimatedMinutes?: number;
    areaId?: string;
  }): Observable<PersonalTask> {
    return this.http.post<PersonalTask>(`${this.apiBaseUrl}/personal/tasks`, payload);
  }

  updateTask(id: string, payload: Partial<PersonalTask>): Observable<PersonalTask> {
    return this.http.patch<PersonalTask>(`${this.apiBaseUrl}/personal/tasks/${id}`, payload);
  }

  notes(): Observable<PersonalNote[]> {
    return this.http.get<PersonalNote[]>(`${this.apiBaseUrl}/personal/notes`);
  }

  createNote(payload: { content: string; title?: string; type?: NoteType; pinned?: boolean; areaId?: string }): Observable<PersonalNote> {
    return this.http.post<PersonalNote>(`${this.apiBaseUrl}/personal/notes`, payload);
  }

  updateNote(id: string, payload: Partial<PersonalNote>): Observable<PersonalNote> {
    return this.http.patch<PersonalNote>(`${this.apiBaseUrl}/personal/notes/${id}`, payload);
  }

  deleteNote(id: string): Observable<PersonalNote> {
    return this.http.delete<PersonalNote>(`${this.apiBaseUrl}/personal/notes/${id}`);
  }

  finance(): Observable<{ accounts: FinanceAccount[]; categories: FinanceCategory[]; transactions: FinanceTransaction[] }> {
    return this.http.get<{ accounts: FinanceAccount[]; categories: FinanceCategory[]; transactions: FinanceTransaction[] }>(
      `${this.apiBaseUrl}/personal/finance`,
    );
  }

  createTransaction(payload: FinanceTransactionPayload): Observable<FinanceTransaction> {
    return this.http.post<FinanceTransaction>(`${this.apiBaseUrl}/personal/finance/transactions`, payload);
  }

  blueDollarQuote(): Observable<DollarQuote> {
    return this.http.get<DollarQuote>('https://dolarapi.com/v1/dolares/blue');
  }

  updateTransaction(id: string, payload: Partial<FinanceTransactionPayload>): Observable<FinanceTransaction> {
    return this.http.patch<FinanceTransaction>(`${this.apiBaseUrl}/personal/finance/transactions/${id}`, payload);
  }

  deleteTransaction(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/personal/finance/transactions/${id}`);
  }

  createAccount(payload: {
    name: string;
    type?: string;
    currency?: string;
    initialBalance?: number;
  }): Observable<FinanceAccount> {
    return this.http.post<FinanceAccount>(`${this.apiBaseUrl}/personal/finance/accounts`, payload);
  }

  createCategory(payload: {
    name: string;
    type: TransactionType;
    monthlyBudget?: number;
    color?: string;
  }): Observable<FinanceCategory> {
    return this.http.post<FinanceCategory>(`${this.apiBaseUrl}/personal/finance/categories`, payload);
  }
}
