import { z } from 'zod';

import { BudgetSchema, TransactionSchema, type Budget, type Transaction } from '../models/schemas';

import { formatISODate } from './dates';

export function formatRubles(value: number): string {
  return `${new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 2 }).format(Math.abs(value))} ₽`;
}

export function parseRubles(raw: string): number {
  const digits = raw.replace(/[^\d]/g, '');
  if (!digits) {
    return 0;
  }
  return Number(digits);
}

export function attachMoneyInput(
  input: HTMLInputElement,
  opts?: { emptyPlaceholder?: string }
): void {
  const basePlaceholder = opts?.emptyPlaceholder ?? input.placeholder ?? '';
  const focusPlaceholder = '0 ₽';

  const setCaretBeforeCurrency = () => {
    const pos = Math.max(0, input.value.length - 2);
    try {
      input.setSelectionRange(pos, pos);
    } catch (e) {
      void e;
    }
  };

  const applyFormat = () => {
    const digits = input.value.replace(/[^\d]/g, '');
    if (!digits) {
      input.value = '';
      return;
    }
    input.value = formatRubles(Number(digits));
    requestAnimationFrame(setCaretBeforeCurrency);
  };

  input.addEventListener('focus', () => {
    input.placeholder = focusPlaceholder;
    applyFormat();
  });

  input.addEventListener('blur', () => {
    input.placeholder = basePlaceholder;
    applyFormat();
  });

  input.addEventListener('input', () => {
    applyFormat();
  });
}

function zodFirstError(err: z.ZodError): string {
  const first = err.issues[0];
  return first?.message ?? 'Ошибка валидации';
}

/**
 * Парсер бюджета.
 * - createdAt: если не передан — ставим "сегодня" (режим создания).
 * - если передан — сохраняем (режим редактирования).
 */
export function parseBudgetForm(input: {
  initialBalance: string;
  startDate: string;
  endDate: string;
  createdAt?: string;
}): { ok: true; value: Budget } | { ok: false; error: string } {
  const candidate = {
    initialBalance: parseRubles(input.initialBalance),
    startDate: input.startDate,
    endDate: input.endDate,
    createdAt: input.createdAt ?? formatISODate(new Date()),
  };

  const res = BudgetSchema.safeParse(candidate);
  if (!res.success) {
    return { ok: false, error: zodFirstError(res.error) };
  }

  return { ok: true, value: res.data };
}

export function parseTransactionForm(input: {
  amount: string;
  type: Transaction['type'];
  date: string;
}): { ok: true; value: Omit<Transaction, 'id'> } | { ok: false; error: string } {
  const candidate = {
    amount: parseRubles(input.amount),
    type: input.type,
    date: input.date,
  };

  const res = TransactionSchema.omit({ id: true }).safeParse(candidate);
  if (!res.success) {
    return { ok: false, error: zodFirstError(res.error) };
  }

  return { ok: true, value: res.data };
}
