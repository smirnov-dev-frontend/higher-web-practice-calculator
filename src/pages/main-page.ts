import { format, differenceInCalendarDays, parseISO, startOfDay } from 'date-fns';
import { ru } from 'date-fns/locale';

import {
  averageRemainingPerDay,
  remainingDays,
  todayLeft,
  totalBalance,
} from '../services/budget-calculator';
import { formatISODate } from '../utils/dates';
import { addTransaction, getAllTransactions } from '../utils/db';
import { appStore } from '../utils/state';
import { attachMoneyInput, parseTransactionForm } from '../utils/validation';

interface BudgetWithCreatedAt {
  initialBalance: number;
  startDate: string;
  endDate: string;
  createdAt: string;
}

interface Tx {
  type: 'expense' | 'income';
  amount: number;
  date: string;
}

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

function averageSpentPerDay(budget: { startDate: string }, txs: Tx[]): number {
  const start = startOfDay(parseISO(budget.startDate));
  const today = startOfDay(new Date());

  const daysPassed = Math.max(1, differenceInCalendarDays(today, start) + 1);

  const spent = txs
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  if (spent === 0) {
    return 0;
  }

  return spent / daysPassed;
}

function parseRubDigitsToNumber(raw: string): number {
  const digits = raw.replace(/[^\d]/g, '');
  if (!digits) {
    return 0;
  }
  return Number(digits);
}

export function renderMainPage(): HTMLElement {
  const state = appStore.getState();
  const wrapper = document.createElement('div');
  wrapper.className = 'min-h-screen bg-slate-50';

  const budget = state.budget as BudgetWithCreatedAt | null;
  if (!budget) {
    appStore.setState({ route: 'start' });
    return wrapper;
  }

  const todayISO = formatISODate(new Date());
  const txs = state.transactions as Tx[];

  const safeBudget: BudgetWithCreatedAt = {
    ...budget,
    createdAt: budget.createdAt || todayISO,
  };

  const total = totalBalance(safeBudget, txs);
  const daily = averageRemainingPerDay(safeBudget, txs, todayISO);
  const leftToday = todayLeft(safeBudget, txs, todayISO);
  const daysLeft = remainingDays(safeBudget, todayISO);

  const lastExpenses = txs
    .filter(t => t.type === 'expense')
    .slice(0, 3)
    .map(t => ({ ...t, amount: Math.abs(t.amount) }));

  const avgSpent = averageSpentPerDay(safeBudget, txs);

  const cheerText =
    leftToday >= 0
      ? '🎉 Отлично справились — сегодня вы в пределах лимита!'
      : '⚠️ Сегодня вы вышли за пределы лимита.';

  const todayTone = leftToday >= 0 ? 'text-emerald-500' : 'text-red-600';

  wrapper.innerHTML = `
    <div class="min-[704px]:hidden min-h-screen bg-white px-4 py-8">
      <div class="pb-32">
        <div class="flex items-center justify-between">
          <div class="font-inter text-[16px] font-normal leading-[1.5] text-slate-500">
            Общий баланс
          </div>
          <div class="font-inter text-[16px] font-normal leading-[1.5] text-blue-500">
            ${formatMoney(daily)} в день
          </div>
        </div>

        <div class="mt-3 flex items-baseline gap-2">
          <div class="font-inter text-[24px] font-semibold leading-[1.2] text-slate-900">
            ${formatMoney(total)}
          </div>
          <div class="font-inter text-[16px] font-normal leading-[1.5] text-slate-500">
            на ${daysLeft} ${pluralDaysRu(daysLeft)}
          </div>
        </div>

        <div class="mt-6 grid grid-cols-2 gap-4">
          <button
            id="editBudgetMobile"
            type="button"
            class="h-12 w-full rounded border border-blue-500 bg-white px-4 font-inter text-[16px] font-medium leading-[1.5] text-blue-500 transition-colors duration-150 hover:bg-blue-500/10"
          >
            Изменить
          </button>

          <button
            id="toHistoryMobile"
            type="button"
            class="h-12 w-full rounded border border-blue-500 bg-white px-4 font-inter text-[16px] font-medium leading-[1.5] text-blue-500 transition-colors duration-150 hover:bg-blue-500/10"
          >
            История расходов
          </button>
        </div>

        <div class="mt-10">
          <div class="font-inter text-[16px] font-medium leading-[1.5] text-slate-500">
            На сегодня доступно
          </div>

          <div class="mt-2 flex items-baseline gap-1">
            <div class="font-inter text-[32px] font-bold leading-[1.2] ${todayTone}">
              ${new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 2 }).format(leftToday)} ₽
            </div>
            <div class="font-inter text-[32px] font-bold leading-[1.2] text-slate-500">/</div>
            <div class="font-inter text-[32px] font-bold leading-[1.2] text-slate-500">
              ${new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 2 }).format(daily)}
            </div>
          </div>

          <div class="mt-3 font-inter text-[12px] font-normal leading-[1.4] text-slate-900">
            ${cheerText}
          </div>

          <form id="txFormMobile" class="mt-6 flex flex-col gap-1">
            <div class="ml-3 font-inter text-[12px] font-normal leading-[1.4] text-slate-500">
              Введите трату
            </div>

            <input
              id="amountMobile"
              name="amount"
              type="text"
              inputmode="numeric"
              placeholder="0 ₽"
              class="h-12 w-full rounded-lg border-2 border-blue-500 bg-white px-3 font-inter text-[16px] font-normal leading-[1.5] text-slate-900 outline-none"
            />

            <p id="txErrorMobile" class="hidden text-sm text-red-600"></p>
          </form>
        </div>
      </div>

      <div class="fixed inset-x-0 bottom-0 bg-white px-4 pb-8 pt-4">
        <button
          type="submit"
          form="txFormMobile"
          id="saveTxBtnMobile"
          class="hidden h-12 w-full rounded bg-blue-500 px-4 font-inter text-[16px] font-medium leading-[1.5] text-white transition-colors duration-150 hover:bg-blue-500/85"
        >
          Сохранить
        </button>
      </div>
    </div>

    <div class="hidden min-[704px]:block">
      <div class="min-h-screen bg-slate-50 px-4 pt-16 pb-6 flex flex-col items-center min-[704px]:pt-0 min-[704px]:pb-0 min-[704px]:justify-center min-[1140px]:pt-16 min-[1140px]:pb-6 min-[1140px]:justify-start">
        <div class="w-full flex flex-col gap-2 min-[704px]:w-[524px] min-[1140px]:w-[558px]">
          <section class="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.10)]">
            <div class="flex flex-col gap-3">
              <div class="flex items-center gap-2">
                <div class="flex-1 text-[18px] font-[600] leading-[1.3] text-slate-500">
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

              <div class="flex flex-col">
                ${
                  lastExpenses.length
                    ? lastExpenses
                        .map((t, idx) => {
                          const divider =
                            idx === lastExpenses.length - 1
                              ? ''
                              : `<div class="my-1.5 h-px w-full bg-slate-500"></div>`;

                          return `
                            <div class="flex items-baseline gap-3">
                              <div class="flex-1 text-[18px] leading-[1.3] text-slate-900">
                               <span class="font-semibold">
                                 ${new Intl.NumberFormat('ru-RU').format(t.amount)}
                               </span>
                               <span class="font-normal"> ₽</span>
                             </div>
                              <div class="text-[16px] font-normal leading-[1.5] text-slate-500">
                                ${formatRuDayMonth(t.date)}
                              </div>
                            </div>
                            ${divider}
                          `;
                        })
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
      </div>
    </div>
  `;

  wrapper.querySelector<HTMLButtonElement>('#toHistory')?.addEventListener('click', () => {
    appStore.setState({ route: 'history' });
  });
  wrapper.querySelector<HTMLButtonElement>('#editBudget')?.addEventListener('click', () => {
    appStore.setState({ route: 'start' });
  });

  wrapper.querySelector<HTMLButtonElement>('#toHistoryMobile')?.addEventListener('click', () => {
    appStore.setState({ route: 'history' });
  });
  wrapper.querySelector<HTMLButtonElement>('#editBudgetMobile')?.addEventListener('click', () => {
    appStore.setState({ route: 'start' });
  });

  const form = wrapper.querySelector<HTMLFormElement>('#txForm');
  const errEl = wrapper.querySelector<HTMLParagraphElement>('#txError');
  const amountEl = wrapper.querySelector<HTMLInputElement>('#amount');

  if (form && errEl && amountEl) {
    attachMoneyInput(amountEl, { emptyPlaceholder: '0 ₽' });

    form.addEventListener('submit', e => {
      e.preventDefault();
      void handleTxSubmit({ errEl, amountEl, today: todayISO });
    });
  }

  const formMobile = wrapper.querySelector<HTMLFormElement>('#txFormMobile');
  const errElMobile = wrapper.querySelector<HTMLParagraphElement>('#txErrorMobile');
  const amountElMobile = wrapper.querySelector<HTMLInputElement>('#amountMobile');
  const saveBtnMobile = wrapper.querySelector<HTMLButtonElement>('#saveTxBtnMobile');

  if (amountElMobile) {
    attachMoneyInput(amountElMobile, { emptyPlaceholder: '0 ₽' });
  }

  if (formMobile && errElMobile && amountElMobile && saveBtnMobile) {
    const isValid = () => parseRubDigitsToNumber(amountElMobile.value) > 0;

    const syncBtn = () => {
      saveBtnMobile.classList.toggle('hidden', !isValid());
    };

    amountElMobile.addEventListener('input', syncBtn);
    amountElMobile.addEventListener('blur', syncBtn);
    syncBtn();

    formMobile.addEventListener('submit', e => {
      e.preventDefault();
      void handleTxSubmit({ errEl: errElMobile, amountEl: amountElMobile, today: todayISO });
    });
  }

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
