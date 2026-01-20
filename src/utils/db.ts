import { openDB, type DBSchema } from 'idb';

import type { Budget, Transaction } from '../models/schemas';

export const DB_NAME = 'BudgetDB';
export const DB_VERSION = 1;

export const budgetStore = 'budget';
export const transactionStore = 'transactions';

type BudgetKey = 'current';

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
  await db.put(budgetStore, budget, 'current');
}

export async function getBudget(): Promise<Budget | undefined> {
  const db = await dbPromise;
  return db.get(budgetStore, 'current');
}

export async function addTransaction(tx: Omit<Transaction, 'id'>): Promise<number> {
  const db = await dbPromise;
  const id = await db.add(transactionStore, tx);
  return id;
}

export async function deleteTransaction(id: number): Promise<void> {
  const db = await dbPromise;
  await db.delete(transactionStore, id);
}

export async function getAllTransactions(): Promise<Transaction[]> {
  const db = await dbPromise;
  const all = await db.getAll(transactionStore);

  all.sort((a, b) => {
    if (a.date === b.date) {
      return (b.id ?? 0) - (a.id ?? 0);
    }
    return a.date < b.date ? 1 : -1;
  });

  return all;
}
