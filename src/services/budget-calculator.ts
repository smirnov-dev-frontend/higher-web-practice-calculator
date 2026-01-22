import { differenceInCalendarDays, parseISO, startOfDay } from 'date-fns';

import type { Budget, Transaction } from '../models/schemas';

export function periodDays(budget: Budget): number {
  const s = parseISO(budget.startDate);
  const e = parseISO(budget.endDate);
  return Math.max(0, differenceInCalendarDays(e, s));
}

export function remainingDays(budget: Budget, todayISO: string): number {
  const today = startOfDay(parseISO(todayISO));
  const end = startOfDay(parseISO(budget.endDate));
  return Math.max(0, differenceInCalendarDays(end, today));
}

export function plannedDailyBudget(budget: Budget): number {
  const days = periodDays(budget);
  if (days <= 0) {
    return 0;
  }
  return round2(budget.initialBalance / days);
}

export function totalBalance(budget: Budget, txs: Transaction[]): number {
  const delta = txs.reduce((acc, t) => acc + (t.type === 'income' ? t.amount : -t.amount), 0);
  return round2(budget.initialBalance + delta);
}

export function todayNet(txs: Transaction[], todayISO: string): number {
  return round2(
    txs
      .filter(t => t.date === todayISO)
      .reduce((acc, t) => acc + (t.type === 'income' ? t.amount : -t.amount), 0)
  );
}
export function todayLeft(budget: Budget, txs: Transaction[], todayISO: string): number {
  const daysLeft = remainingDays(budget, todayISO);
  if (daysLeft <= 0) {
    return 0;
  }

  const netToday = todayNet(txs, todayISO);
  const balanceNow = totalBalance(budget, txs);
  const balanceStartOfDay = round2(balanceNow - netToday);

  const dailyStartOfDay = round2(balanceStartOfDay / daysLeft);
  return round2(dailyStartOfDay + netToday);
}

export function averageRemainingPerDay(
  budget: Budget,
  txs: Transaction[],
  todayISO: string
): number {
  const daysLeft = remainingDays(budget, todayISO);
  if (daysLeft <= 0) {
    return 0;
  }

  const netToday = todayNet(txs, todayISO);
  const balanceNow = totalBalance(budget, txs);
  const balanceStartOfDay = round2(balanceNow - netToday);

  return round2(balanceStartOfDay / daysLeft);
}

export function totalExpenses(txs: Transaction[]): number {
  return round2(txs.reduce((acc, t) => acc + (t.type === 'expense' ? t.amount : 0), 0));
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
