import { isAfter, isEqual, isValid, parseISO } from 'date-fns';
import { z } from 'zod';

const DateStringSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Неверный формат даты (ожидается YYYY-MM-DD)')
  .refine(v => isValid(parseISO(v)), 'Некорректная дата');

export const BudgetSchema = z
  .object({
    initialBalance: z.coerce.number().positive('Баланс должен быть положительным'),
    startDate: DateStringSchema,
    endDate: DateStringSchema,
    createdAt: DateStringSchema.optional(),
  })
  .refine(
    b => {
      const s = parseISO(b.startDate);
      const e = parseISO(b.endDate);
      return isAfter(e, s) || isEqual(e, s);
    },
    { message: 'Дата окончания должна быть не раньше даты начала', path: ['endDate'] }
  );

export type Budget = z.infer<typeof BudgetSchema>;

export const TransactionSchema = z.object({
  id: z.number().int().optional(),
  amount: z.coerce.number().positive('Сумма должна быть больше 0'),
  type: z.enum(['expense', 'income']),
  date: DateStringSchema,
});

export type Transaction = z.infer<typeof TransactionSchema>;
