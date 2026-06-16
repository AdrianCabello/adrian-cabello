import { Injectable, signal } from '@angular/core';

export interface DollarRateHistoryItem {
  id: string;
  rate: number;
  createdAt: string;
}

interface FinanceSettingsState {
  dollarRate: number;
  dollarRateHistory: DollarRateHistoryItem[];
  dollarRateByTransactionId: Record<string, number>;
}

const STORAGE_KEY = 'adrian-os-finance-settings';

@Injectable({
  providedIn: 'root',
})
export class FinanceSettingsService {
  private readonly state = signal<FinanceSettingsState>(this.loadState());

  readonly dollarRate = this.state.asReadonly();

  get currentDollarRate(): number {
    return this.state().dollarRate;
  }

  saveDollarRate(rate: number): void {
    const normalizedRate = this.normalizeRate(rate);
    if (!normalizedRate) return;

    const nextState: FinanceSettingsState = {
      dollarRate: normalizedRate,
      dollarRateByTransactionId: this.state().dollarRateByTransactionId,
      dollarRateHistory: [
        {
          id: `${Date.now()}`,
          rate: normalizedRate,
          createdAt: new Date().toISOString(),
        },
        ...this.state().dollarRateHistory,
      ].slice(0, 30),
    };

    this.state.set(nextState);
    this.persistState(nextState);
  }

  saveTransactionDollarRate(transactionId: string, currency?: string | null): void {
    if (!transactionId) return;

    const ratesByTransactionId = { ...this.state().dollarRateByTransactionId };
    if (currency === 'USD' && this.currentDollarRate > 0) {
      ratesByTransactionId[transactionId] = this.currentDollarRate;
    } else {
      delete ratesByTransactionId[transactionId];
    }

    const nextState = {
      ...this.state(),
      dollarRateByTransactionId: ratesByTransactionId,
    };
    this.state.set(nextState);
    this.persistState(nextState);
  }

  deleteTransactionDollarRate(transactionId: string): void {
    if (!transactionId) return;

    const ratesByTransactionId = { ...this.state().dollarRateByTransactionId };
    delete ratesByTransactionId[transactionId];

    const nextState = {
      ...this.state(),
      dollarRateByTransactionId: ratesByTransactionId,
    };
    this.state.set(nextState);
    this.persistState(nextState);
  }

  convertUsdToArs(amount: string | number): number {
    return Number(amount) * this.currentDollarRate;
  }

  convertToArs(amount: string | number, currency?: string | null): number {
    const numericAmount = Number(amount);
    if (!Number.isFinite(numericAmount)) return 0;
    return currency === 'USD' ? numericAmount * this.currentDollarRate : numericAmount;
  }

  convertTransactionToArs(transaction: { id: string; amount: string | number; currency?: string | null }): number {
    const numericAmount = Number(transaction.amount);
    if (!Number.isFinite(numericAmount)) return 0;
    if (transaction.currency !== 'USD') return numericAmount;

    const transactionRate = this.state().dollarRateByTransactionId[transaction.id] || this.currentDollarRate;
    return numericAmount * transactionRate;
  }

  private loadState(): FinanceSettingsState {
    if (typeof window === 'undefined') {
      return this.defaultState();
    }

    const storedValue = window.localStorage.getItem(STORAGE_KEY);
    if (!storedValue) return this.defaultState();

    try {
      const parsedValue = JSON.parse(storedValue) as Partial<FinanceSettingsState>;
      const dollarRate = this.normalizeRate(parsedValue.dollarRate ?? 0);
      const dollarRateHistory = Array.isArray(parsedValue.dollarRateHistory) ? parsedValue.dollarRateHistory : [];

      return {
        dollarRate,
        dollarRateByTransactionId: this.normalizeTransactionRates(parsedValue.dollarRateByTransactionId),
        dollarRateHistory: dollarRateHistory
          .filter((item) => this.normalizeRate(item.rate) > 0 && typeof item.createdAt === 'string')
          .map((item) => ({ id: String(item.id || item.createdAt), rate: this.normalizeRate(item.rate), createdAt: item.createdAt }))
          .slice(0, 30),
      };
    } catch {
      return this.defaultState();
    }
  }

  private persistState(state: FinanceSettingsState): void {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  private defaultState(): FinanceSettingsState {
    return {
      dollarRate: 0,
      dollarRateHistory: [],
      dollarRateByTransactionId: {},
    };
  }

  private normalizeRate(rate: string | number): number {
    const numericRate = Number(rate);
    if (!Number.isFinite(numericRate) || numericRate < 0) return 0;
    return Math.round(numericRate * 100) / 100;
  }

  private normalizeTransactionRates(value: unknown): Record<string, number> {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return {};

    return Object.entries(value).reduce<Record<string, number>>((rates, [transactionId, rate]) => {
      const normalizedRate = this.normalizeRate(rate as string | number);
      if (normalizedRate > 0) rates[transactionId] = normalizedRate;
      return rates;
    }, {});
  }
}
