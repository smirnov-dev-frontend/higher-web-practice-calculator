import { openDB, type DBSchema } from 'idb';

import type { Budget, Transaction } from '../models/schemas';

export const DB_NAME = 'BudgetDB';
export const DB_VERSION = 1;

export const budgetStore = 'budget';
export const transactionStore = 'transactions';

export const CURRENT_BUDGET_KEY = 'current' as const;
type BudgetKey = typeof CURRENT_BUDGET_KEY;

interface BudgetDbSchema extends DBSchema {
  [budgetStore]: {
    key: BudgetKey;
    value: Budget;
  };
  [transactionStore]: {
    key: number;
    value: Transaction;
    indexes: { date: string };
  };
}

export const dbPromise = openDB<BudgetDbSchema>(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(budgetStore)) {
      db.createObjectStore(budgetStore);
    }

    if (!db.objectStoreNames.contains(transactionStore)) {
      const store = db.createObjectStore(transactionStore, {
        keyPath: 'id',
        autoIncrement: true,
      });
      store.createIndex('date', 'date');
    }
  },
});

export async function saveBudget(budget: Budget): Promise<void> {
  const db = await dbPromise;
  await db.put(budgetStore, budget, CURRENT_BUDGET_KEY);
}

export async function getBudget(): Promise<Budget | undefined> {
  const db = await dbPromise;
  return db.get(budgetStore, CURRENT_BUDGET_KEY);
}

export async function addTransaction(tx: Omit<Transaction, 'id'>): Promise<number> {
  const db = await dbPromise;
  return db.add(transactionStore, tx);
}

export async function deleteTransaction(id: number): Promise<void> {
  const db = await dbPromise;
  await db.delete(transactionStore, id);
}

export async function getAllTransactions(): Promise<Transaction[]> {
  const db = await dbPromise;
  const tx = db.transaction(transactionStore, 'readonly');
  const index = tx.store.index('date');

  const result: Transaction[] = [];

  let cursor = await index.openCursor(null, 'prev');
  while (cursor) {
    result.push(cursor.value);
    cursor = await cursor.continue();
  }

  await tx.done;
  return result;
}
