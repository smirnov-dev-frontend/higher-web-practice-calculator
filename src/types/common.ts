export interface BudgetWithCreatedAt {
  initialBalance: number;
  startDate: string;
  endDate: string;
  createdAt: string;
}

export interface Tx {
  type: 'expense' | 'income';
  amount: number;
  date: string;
}
