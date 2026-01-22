import { differenceInCalendarDays, isBefore, parseISO, startOfDay } from 'date-fns';

import type { Budget, Transaction } from '../models/schemas';

function toDay(iso: string): Date {
  return startOfDay(parseISO(iso));
}

export function todayLimit(budget: Budget, txs: Transaction[], todayISO: string): number {
  const daysLeft = remainingDays(budget, todayISO);
  if (daysLeft <= 0) {
    return 0;
  }

  const netToday = todayNet(txs, todayISO);
  const balanceNow = totalBalance(budget, txs);
  const balanceStartOfDay = round2(balanceNow - netToday);

  return round2(balanceStartOfDay / daysLeft);
}
/**
 * Период: [startDate, endDate) — endDate НЕ входит.
 * Пример: 2025-10-25 .. 2025-10-30 => 5 дней (25..29)
 */
export function periodDays(budget: Budget): number {
  const s = toDay(budget.startDate);
  const e = toDay(budget.endDate);
  return Math.max(0, differenceInCalendarDays(e, s));
}

/**
 * Период активен, если today в [startDate, endDate)
 */
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

/**
 * Остаток на сегодня имеет смысл только когда период активен.
 * Если период не активен — возвращаем 0, а UI должен показать "период завершён/не начался".
 */
export function todayLeft(budget: Budget, txs: Transaction[], todayISO: string): number {
  if (!isPeriodActive(budget, todayISO)) {
    return 0;
  }

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
  if (!isPeriodActive(budget, todayISO)) {
    return 0;
  }

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
