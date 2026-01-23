import { format, parseISO, differenceInCalendarDays, startOfDay } from 'date-fns';
import { ru } from 'date-fns/locale';

import type { Tx } from '../types/common';

export function formatMoney(n: number): string {
  return `${new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: 2,
  }).format(n)} ₽`;
}
export function formatNumberRu(n: number): string {
  return new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: 2,
  }).format(n);
}

export function pluralDaysRu(n: number): string {
  const pr = new Intl.PluralRules('ru-RU');
  const form = pr.select(n);

  if (form === 'one') {
    return 'день';
  }
  if (form === 'few') {
    return 'дня';
  }
  return 'дней';
}

export function formatRuDayMonth(iso: string): string {
  return format(parseISO(iso), 'd MMMM', { locale: ru });
}

export function parseRubDigitsToNumber(raw: string): number {
  const digits = raw.replace(/[^\d]/g, '');
  return digits ? Number(digits) : 0;
}

export function averageSpentPerDay(budget: { startDate: string }, txs: Tx[]): number {
  const start = startOfDay(parseISO(budget.startDate));
  const today = startOfDay(new Date());

  const daysPassed = Math.max(1, differenceInCalendarDays(today, start) + 1);

  const spent = txs
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return spent === 0 ? 0 : spent / daysPassed;
}
