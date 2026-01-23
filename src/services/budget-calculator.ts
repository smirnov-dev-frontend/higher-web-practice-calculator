import { differenceInCalendarDays, isBefore, parseISO, startOfDay } from 'date-fns';

import type { Budget, Transaction } from '../models/schemas';

function toDay(iso: string): Date {
  return startOfDay(parseISO(iso));
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function getDayContext(
  budget: Budget,
  txs: Transaction[],
  todayISO: string
): {
  daysLeft: number;
  netToday: number;
  balanceNow: number;
  balanceStartOfDay: number;
} {
  const daysLeft = remainingDays(budget, todayISO);
  const netToday = todayNet(txs, todayISO);
  const balanceNow = totalBalance(budget, txs);
  const balanceStartOfDay = round2(balanceNow - netToday);

  return { daysLeft, netToday, balanceNow, balanceStartOfDay };
}

export function periodDays(budget: Budget): number {
  const s = toDay(budget.startDate);
  const e = toDay(budget.endDate);
  return Math.max(0, differenceInCalendarDays(e, s));
}

export function isPeriodActive(budget: Budget, todayISO: string): boolean {
  const s = toDay(budget.startDate);
  const e = toDay(budget.endDate);
  const today = toDay(todayISO);

  if (isBefore(e, s) || differenceInCalendarDays(e, s) <= 0) {
    return false;
  }
  if (isBefore(today, s)) {
    return false;
  }
  if (!isBefore(today, e)) {
    return false;
  }
  return true;
}

export function remainingDays(budget: Budget, todayISO: string): number {
  const today = toDay(todayISO);
  const end = toDay(budget.endDate);
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

export function todayLimit(budget: Budget, txs: Transaction[], todayISO: string): number {
  return averageRemainingPerDay(budget, txs, todayISO);
}

export function todayLeft(budget: Budget, txs: Transaction[], todayISO: string): number {
  if (!isPeriodActive(budget, todayISO)) {
    return 0;
  }

  const { daysLeft, netToday, balanceStartOfDay } = getDayContext(budget, txs, todayISO);

  if (daysLeft <= 0) {
    return 0;
  }

  const dailyStartOfDay = round2(balanceStartOfDay / daysLeft);
  return round2(dailyStartOfDay + netToday);
}

export function averageRemainingPerDay(
  budget: Budget,
  txs: Transaction[],
  todayISO: string
): number {
  if (!isPeriodActive(budget, todayISO)) {
    return 0;
  }

  const { daysLeft, balanceStartOfDay } = getDayContext(budget, txs, todayISO);

  if (daysLeft <= 0) {
    return 0;
  }

  return round2(balanceStartOfDay / daysLeft);
}

export function totalExpenses(txs: Transaction[]): number {
  return round2(txs.reduce((acc, t) => acc + (t.type === 'expense' ? t.amount : 0), 0));
}
