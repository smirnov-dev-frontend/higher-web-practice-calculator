import {
  plannedDailyBudget,
  remainingDays,
  todayLeft,
  totalBalance,
} from '../services/budget-calculator';
import { formatISODate } from '../utils/dates';
import { addTransaction, getAllTransactions } from '../utils/db';
import {
  formatMoney,
  pluralDaysRu,
  formatRuDayMonth,
  parseRubDigitsToNumber,
  averageSpentPerDay,
} from '../utils/format';
import { appStore } from '../utils/state';
import { attachMoneyInput, parseTransactionForm } from '../utils/validation';

import type { BudgetWithCreatedAt, Tx } from '../types/common';

export function renderMainPage(): HTMLElement {
  const state = appStore.getState();
  const wrapper = document.createElement('div');
  wrapper.className = 'min-h-screen bg-slate-50 overflow-x-hidden';

  const budget = state.budget as BudgetWithCreatedAt | null;
  if (!budget) {
    appStore.setState({ route: 'start' });
    return wrapper;
  }

  const todayISO = formatISODate(new Date());
  const txs = (state.transactions as Tx[]) ?? [];

  const safeBudget: BudgetWithCreatedAt = {
    ...budget,
    createdAt: budget.createdAt || todayISO,
  };

  const total = totalBalance(safeBudget, txs);
  const planned = plannedDailyBudget(safeBudget);
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
    <!-- MOBILE (base) -->
    <div class="page-mobile">
      <div class="pb-32">
        <div class="flex flex-wrap items-center justify-between gap-3 min-w-0">
          <div class="min-w-0   text-[16px] font-normal leading-[1.5] text-slate-500 [overflow-wrap:anywhere]">
            Общий баланс
          </div>
          <div class="shrink-0   text-[16px] font-normal leading-[1.5] text-blue-500">
            ${formatMoney(planned)} в день
          </div>
        </div>

        <div class="mt-3 flex flex-wrap items-baseline gap-2 min-w-0">
          <div class="min-w-0 break-all   text-[24px] font-semibold leading-[1.2] text-slate-900">
            ${formatMoney(total)}
          </div>
          <div class="shrink-0   text-[16px] font-normal leading-[1.5] text-slate-500">
            на ${daysLeft} ${pluralDaysRu(daysLeft)}
          </div>
        </div>

        <div class="mt-6 grid grid-cols-2 gap-4">
          <button id="editBudgetMobile" type="button" class="btn-outline">
            Изменить
          </button>

          <button id="toHistoryMobile" type="button" class="btn-outline">
            История расходов
          </button>
        </div>

        <div class="mt-10">
          <div class="  text-[16px] font-medium leading-[1.5] text-slate-500">
            На сегодня доступно
          </div>

          <div class="mt-2 flex flex-wrap items-baseline gap-1 min-w-0">
            <div class="min-w-0 break-all   text-[32px] font-bold leading-[1.2] ${todayTone}">
              ${new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 2 }).format(leftToday)} ₽
            </div>
            <div class="shrink-0   text-[32px] font-bold leading-[1.2] text-slate-500">/</div>
            <div class="min-w-0 break-all   text-[32px] font-bold leading-[1.2] text-slate-500">
              ${new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 2 }).format(planned)}
            </div>
          </div>

          <div class="mt-3   text-[12px] font-normal leading-[1.4] text-slate-900">
            ${cheerText}
          </div>

          <form id="txFormMobile" class="mt-6 flex flex-col gap-1">
            <div class="label">Введите трату</div>

            <input
              id="amountMobile"
              name="amount"
              type="text"
              inputmode="numeric"
              placeholder="0 ₽"
              class="input-accent"
            />

            <p id="txErrorMobile" class="hidden text-sm text-red-600"></p>
          </form>
        </div>
      </div>

      <div class="bottom-bar">
        <button
          type="submit"
          form="txFormMobile"
          id="saveTxBtnMobile"
          class="hidden btn-primary"
        >
          Сохранить
        </button>
      </div>
    </div>

    <!-- DESKTOP (enhancement) -->
    <div class="page-desktop-shell">
      <div class="container-narrow">
        <section class="card">
          <div class="flex flex-col gap-3">
            <div class="flex flex-wrap items-center gap-2 min-w-0">
              <div class="flex-1 min-w-0   text-[18px] font-[600] leading-[1.3] text-slate-500 [overflow-wrap:anywhere]">
                Общий баланс
              </div>

              <div class="shrink-0   text-[16px] font-normal leading-[1.5] text-blue-500">
                ${formatMoney(planned)} в день
              </div>
            </div>

            <div class="flex flex-wrap items-baseline gap-2 min-w-0">
              <div class="min-w-0 break-all   text-[32px] font-bold leading-[1.2] text-slate-900">
                ${formatMoney(total)}
              </div>
              <div class="shrink-0   text-[16px] font-normal leading-[1.5] text-slate-500">
                на ${daysLeft} ${pluralDaysRu(daysLeft)}
              </div>
            </div>

            <button id="editBudget" type="button" class="btn-outline">
              Изменить
            </button>
          </div>
        </section>

        <section class="card">
          <div class="flex flex-col gap-3">
            <div class="flex flex-col gap-0.5">
              <div class="  text-[18px] font-semibold leading-[1.3] text-slate-500">
                На сегодня доступно
              </div>

              <div class="flex flex-wrap items-baseline gap-2 min-w-0">
                <div class="min-w-0 break-all   text-[32px] font-bold leading-[1.2] ${todayTone}">
                  ${formatMoney(leftToday)}
                </div>
                <div class="shrink-0   text-[32px] font-bold leading-[1.2] text-slate-500">/</div>
                <div class="min-w-0 break-all   text-[32px] font-bold leading-[1.2] text-slate-500">
                  ${new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 2 }).format(planned)}
                </div>
              </div>
            </div>

            <div class="  text-[12px] font-normal leading-[1.4] text-slate-900">
              ${cheerText}
            </div>

            <form id="txForm" class="flex flex-col gap-3">
              <div class="flex flex-col gap-1">
                <div class="label">Введите трату</div>

                <input
                  id="amount"
                  name="amount"
                  type="text"
                  inputmode="numeric"
                  placeholder="0 ₽"
                  class="input-base"
                />
              </div>

              <button type="submit" class="btn-primary-desktop">
                Сохранить
              </button>

              <p id="txError" class="hidden text-sm text-red-600"></p>
            </form>
          </div>
        </section>

        <section class="card">
          <div class="flex flex-col gap-6">
            <div class="flex flex-col gap-1">
              <div class="  text-[24px] font-semibold leading-[1.2] text-slate-500">
                История расходов
              </div>
              <div class="  text-[12px] font-normal leading-[1.4] text-blue-500">
                Средние траты в день: ${formatMoney(avgSpent)}
              </div>
            </div>

            <div class="flex flex-col min-w-0">
              ${
                lastExpenses.length
                  ? lastExpenses
                      .map((t, idx) => {
                        const divider =
                          idx === lastExpenses.length - 1 ? '' : `<div class="divider-line"></div>`;

                        return `
                          <div class="flex flex-wrap items-baseline gap-3 min-w-0">
                            <div class="flex-1 min-w-0 break-all   text-[18px] leading-[1.3] text-slate-900">
                              <span class="font-semibold">
                                ${new Intl.NumberFormat('ru-RU').format(t.amount)}
                              </span>
                              <span class="font-normal"> ₽</span>
                            </div>
                            <div class="shrink-0   text-[16px] font-normal leading-[1.5] text-slate-500">
                              ${formatRuDayMonth(t.date)}
                            </div>
                          </div>
                          ${divider}
                        `;
                      })
                      .join('')
                  : `<div class="  text-[16px] font-normal leading-[1.5] text-slate-500">Пока нет расходов.</div>`
              }
            </div>

            <button id="toHistory" type="button" class="btn-outline">
              Смотреть всю историю
            </button>
          </div>
        </section>
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
