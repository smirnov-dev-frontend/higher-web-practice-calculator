import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

import {
  plannedDailyBudget,
  remainingDays,
  todayLeft,
  totalBalance,
} from '../services/budget-calculator';
import { formatISODate } from '../utils/dates';
import { addTransaction, getAllTransactions } from '../utils/db';
import { appStore } from '../utils/state';
import { attachMoneyInput, parseTransactionForm } from '../utils/validation';

function formatMoney(n: number): string {
  return `${new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 2 }).format(n)} ₽`;
}

function pluralDaysRu(n: number): string {
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

function formatRuDayMonth(iso: string): string {
  const d = parseISO(iso);
  return format(d, 'd MMMM', { locale: ru });
}

function averageSpentPerDay(
  budget: { startDate: string },
  txs: Array<{ type: 'expense' | 'income'; amount: number; date: string }>
): number {
  const start = parseISO(budget.startDate);
  const today = new Date();
  const daysPassed = Math.max(
    1,
    Math.ceil((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
  );

  const spent = txs
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return spent / daysPassed;
}

export function renderMainPage(): HTMLElement {
  const state = appStore.getState();
  const wrapper = document.createElement('div');
  wrapper.className = 'min-h-screen bg-slate-50';

  const budget = state.budget;
  if (!budget) {
    appStore.setState({ route: 'start' });
    return wrapper;
  }

  const todayISO = formatISODate(new Date());
  const txs = state.transactions;

  const total = totalBalance(budget, txs);
  const daily = plannedDailyBudget(budget);
  const leftToday = todayLeft(budget, txs, todayISO);
  const daysLeft = remainingDays(budget, todayISO);

  const lastExpenses = txs
    .filter(t => t.type === 'expense')
    .slice(0, 3)
    .map(t => ({ ...t, amount: Math.abs(t.amount) }));

  const avgSpent = averageSpentPerDay(budget, txs);

  const cheerText =
    leftToday >= 0
      ? '🎉 Отлично справились — сегодня вы в пределах лимита!'
      : '⚠️ Сегодня вы вышли за пределы лимита.';

  const todayTone = leftToday >= 0 ? 'text-emerald-500' : 'text-red-600';

  wrapper.innerHTML = `
    <div class="mx-auto flex w-full max-w-[558px] flex-col gap-2 px-4 py-6">
      <!-- CARD 1: TOTAL -->
      <section class="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.10)]">
        <div class="flex flex-col gap-3">
          <div class="flex items-center gap-2">
            <div class="flex-1 text-[18px] font-semibold leading-[1.3] text-slate-500">
              Общий баланс
            </div>

            <div class="text-[16px] font-normal leading-[1.5] text-blue-500">
              ${formatMoney(daily)} в день
            </div>
          </div>

          <div class="flex items-baseline gap-2">
            <div class="text-[32px] font-bold leading-[1.2] text-slate-900">
              ${formatMoney(total)}
            </div>
            <div class="text-[16px] font-normal leading-[1.5] text-slate-500">
              на ${daysLeft} ${pluralDaysRu(daysLeft)}
            </div>
          </div>

          <button
            id="editBudget"
            type="button"
            class="h-12 w-full rounded-[4px] border border-blue-500 bg-white px-4 text-[16px] font-medium leading-[1.5] text-blue-500 hover:bg-blue-500/10"
          >
            Изменить
          </button>
        </div>
      </section>

      <!-- CARD 2: TODAY + INPUT -->
      <section class="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.10)]">
        <div class="flex flex-col gap-3">
          <div class="flex flex-col gap-0.5">
            <div class="text-[18px] font-semibold leading-[1.3] text-slate-500">
              На сегодня доступно
            </div>

            <div class="flex items-baseline gap-2">
              <div class="text-[32px] font-bold leading-[1.2] ${todayTone}">
                ${formatMoney(leftToday)}
              </div>
              <div class="text-[32px] font-bold leading-[1.2] text-slate-500">/</div>
              <div class="text-[32px] font-bold leading-[1.2] text-slate-500">
                ${new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 2 }).format(daily)}
              </div>
            </div>
          </div>

          <div class="text-[12px] font-normal leading-[1.4] text-slate-900">
            ${cheerText}
          </div>

          <form id="txForm" class="flex flex-col gap-3">
            <div class="flex flex-col gap-1">
              <div class="ml-3 text-[12px] font-normal leading-[1.4] text-slate-500">
                Введите трату
              </div>

              <input
                id="amount"
                name="amount"
                type="text"
                inputmode="numeric"
                placeholder="0 ₽"
                class="h-12 w-full rounded-lg border border-slate-200 bg-white px-3 text-[16px] font-normal leading-[1.5] text-slate-900 outline-none focus:border-2 focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              class="h-12 w-full rounded-[4px] bg-blue-500 px-4 text-[16px] font-medium leading-[1.5] text-white hover:bg-blue-500/85"
            >
              Сохранить
            </button>

            <p id="txError" class="hidden text-sm text-red-600"></p>
          </form>
        </div>
      </section>

      <!-- CARD 3: HISTORY -->
      <section class="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.10)]">
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-1">
            <div class="text-[24px] font-semibold leading-[1.2] text-slate-500">
              История расходов
            </div>
            <div class="text-[12px] font-normal leading-[1.4] text-blue-500">
              Средние траты в день: ${formatMoney(avgSpent)}
            </div>
          </div>

          <div class="flex flex-col gap-1">
            ${
              lastExpenses.length
                ? lastExpenses
                    .map(
                      t => `
                        <div class="flex items-baseline gap-3">
                          <div class="flex-1 text-[18px] font-semibold leading-[1.3] text-slate-900">
                            ${formatMoney(t.amount)}
                          </div>
                          <div class="text-[16px] font-normal leading-[1.5] text-slate-500">
                            ${formatRuDayMonth(t.date)}
                          </div>
                        </div>
                        <div class="h-px w-full bg-slate-500"></div>
                      `
                    )
                    .join('')
                : `<div class="text-[16px] font-normal leading-[1.5] text-slate-500">Пока нет расходов.</div>`
            }
          </div>

          <button
            id="toHistory"
            type="button"
            class="h-12 w-full rounded-[4px] border border-blue-500 bg-white px-4 text-[16px] font-medium leading-[1.5] text-blue-500 hover:bg-blue-500/10"
          >
            Смотреть всю историю
          </button>
        </div>
      </section>
    </div>
  `;

  wrapper.querySelector<HTMLButtonElement>('#editBudget')?.addEventListener('click', () => {
    appStore.setState({ route: 'start' });
  });

  wrapper.querySelector<HTMLButtonElement>('#toHistory')?.addEventListener('click', () => {
    appStore.setState({ route: 'history' });
  });

  const form = wrapper.querySelector<HTMLFormElement>('#txForm');
  const errEl = wrapper.querySelector<HTMLParagraphElement>('#txError');
  const amountEl = wrapper.querySelector<HTMLInputElement>('#amount');

  if (!form || !errEl || !amountEl) {
    return wrapper;
  }

  attachMoneyInput(amountEl, { emptyPlaceholder: '0 ₽' });

  form.addEventListener('submit', e => {
    e.preventDefault();
    void handleTxSubmit({ errEl, amountEl, today: todayISO });
  });

  return wrapper;
}

async function handleTxSubmit(args: {
  errEl: HTMLParagraphElement;
  amountEl: HTMLInputElement;
  today: string;
}): Promise<void> {
  const { errEl, amountEl, today } = args;

  errEl.classList.add('hidden');
  errEl.textContent = '';

  const parsed = parseTransactionForm({
    amount: amountEl.value.trim(),
    type: 'expense',
    date: today,
  });

  if (!parsed.ok) {
    errEl.textContent = parsed.error;
    errEl.classList.remove('hidden');
    return;
  }

  await addTransaction(parsed.value);

  const fresh = await getAllTransactions();
  appStore.setState({ transactions: fresh });

  amountEl.value = '';
}
