import { z } from 'zod';

import { BudgetSchema, TransactionSchema, type Budget, type Transaction } from '../models/schemas';

import { formatISODate } from './dates';
import { formatNumberRu, parseRubDigitsToNumber } from './format';

export function formatRubles(value: number): string {
  return `${formatNumberRu(Math.abs(value))} ₽`;
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
    const amount = parseRubDigitsToNumber(input.value);
    if (!amount) {
      input.value = '';
      return;
    }

    input.value = formatRubles(amount);
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

export function parseBudgetForm(input: {
  initialBalance: string;
  startDate: string;
  endDate: string;
  createdAt?: string;
}): { ok: true; value: Budget } | { ok: false; error: string } {
  const candidate = {
    initialBalance: parseRubDigitsToNumber(input.initialBalance),
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
    amount: parseRubDigitsToNumber(input.amount),
    type: input.type,
    date: input.date,
  };

  const res = TransactionSchema.omit({ id: true }).safeParse(candidate);
  if (!res.success) {
    return { ok: false, error: zodFirstError(res.error) };
  }

  return { ok: true, value: res.data };
}
