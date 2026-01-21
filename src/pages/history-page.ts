import { format, parseISO, differenceInCalendarDays, startOfDay } from 'date-fns';
import { ru } from 'date-fns/locale';

import { deleteTransaction, getAllTransactions } from '../utils/db';
import { appStore } from '../utils/state';

import type { Transaction } from '../models/schemas';

function formatRuDayMonth(iso: string): string {
  const d = parseISO(iso);
  return format(d, 'd MMMM', { locale: ru });
}

function averageSpentPerDay(budget: { startDate: string }, txs: Transaction[]): number {
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

function formatNumber(n: number): string {
  return new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(n);
}

export function renderHistoryPage(): HTMLElement {
  const state = appStore.getState();
  const wrapper = document.createElement('div');
  wrapper.className = 'min-h-screen bg-slate-50';

  const budget = state.budget;
  if (!budget) {
    appStore.setState({ route: 'start' });
    return wrapper;
  }

  const originalTxs = (state.transactions as Transaction[]) ?? [];
  const deletedIds = new Set<number>();

  const goMain = () => appStore.setState({ route: 'main' });

  const getVisibleTxs = (): Transaction[] => originalTxs.filter(t => !deletedIds.has(Number(t.id)));

  const getVisibleExpenses = (): Array<Transaction & { amount: number }> =>
    getVisibleTxs()
      .filter(t => t.type === 'expense')
      .map(t => ({ ...t, amount: Math.abs(t.amount) }));

  const renderExpensesList = (
    expenses: Array<Transaction & { amount: number }>,
    mobile: boolean
  ) => {
    if (!expenses.length) {
      return `<div class="${mobile ? 'mt-4' : ''} text-[16px] font-normal leading-[1.5] text-slate-500 font-inter">Пока нет расходов.</div>`;
    }

    return expenses
      .map((t, idx) => {
        const divider =
          idx === expenses.length - 1
            ? ''
            : `<div class="h-px w-full ${mobile ? 'bg-slate-200' : 'bg-slate-500'}"></div>`;

        return `
          <div class="${mobile ? 'py-2' : ''} flex items-baseline gap-3">
            <div class="flex-1 text-[18px] ${mobile ? 'font-normal' : 'font-semibold'} leading-[1.3] text-slate-900 font-inter">
              ${formatNumber(t.amount)}
            </div>

            <div class="text-[16px] font-normal leading-[1.5] text-slate-500 font-inter">
              ${formatRuDayMonth(t.date)}
            </div>

            <button
              type="button"
              class="ml-1 inline-flex ${mobile ? 'h-8 w-8' : 'h-6 w-6'} items-center justify-center text-slate-500 hover:text-slate-700"
              aria-label="Удалить"
              data-del-id="${String(t.id)}"
            >
              ${renderDeleteIcon()}
            </button>
          </div>
          ${divider}
        `;
      })
      .join('');
  };

  const renderAll = () => {
    const visibleTxs = getVisibleTxs();
    const visibleExpenses = getVisibleExpenses();
    const avgSpent = averageSpentPerDay(budget, visibleTxs);
    const hasChanges = deletedIds.size > 0;

    wrapper.innerHTML = `
      <div class="min-[704px]:hidden min-h-screen bg-white px-4 py-8">
        <div class="pb-32">
          <div class="flex flex-col gap-1">
            <div class="text-[24px] font-bold leading-[1.2] text-slate-900 font-inter">
              История расходов
            </div>
            <div id="avgMobile" class="text-[12px] font-normal leading-[1.4] text-blue-500 font-inter">
              Средние траты в день: ${formatNumber(avgSpent)} ₽
            </div>
          </div>

          <div id="historyListMobile" class="mt-6 flex flex-col gap-2">
            ${renderExpensesList(visibleExpenses, true)}
          </div>
        </div>

        <div class="fixed inset-x-0 bottom-0 bg-white px-4 pb-8 pt-4">
          <button
            id="backBtnMobile"
            type="button"
            class="${hasChanges ? 'hidden' : ''} h-12 w-full rounded border border-blue-500 bg-white px-4 font-inter text-[16px] font-medium leading-[1.5] text-blue-500 transition-colors duration-150 hover:bg-blue-500/10"
          >
            Вернуться
          </button>

          <button
            id="cancelBtnMobile"
            type="button"
            class="${hasChanges ? '' : 'hidden'} h-12 w-full rounded border border-blue-500 bg-white px-4 font-inter text-[16px] font-medium leading-[1.5] text-blue-500 transition-colors duration-150 hover:bg-blue-500/10"
          >
            Вернуться без сохранения
          </button>

          <button
            id="saveBtnMobile"
            type="button"
            class="${hasChanges ? '' : 'hidden'} mt-3 h-12 w-full rounded bg-blue-500 px-4 font-inter text-[16px] font-medium leading-[1.5] text-white transition-colors duration-150 hover:bg-blue-500/85"
          >
            Сохранить
          </button>
        </div>
      </div>

      <div
        class="hidden min-[704px]:flex min-h-screen bg-slate-50 px-4 pt-16 pb-6 flex-col items-center
               min-[704px]:pt-0 min-[704px]:pb-0 min-[704px]:justify-center
               min-[1140px]:pt-16 min-[1140px]:pb-6 min-[1140px]:justify-start"
      >
        <div class="w-full flex flex-col min-[704px]:w-[524px] min-[1140px]:w-[558px]">
          <section class="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.10)]">
            <div class="flex flex-col gap-6">
              <div class="flex flex-col gap-1">
                <div class="text-[24px] font-semibold leading-[1.2] text-slate-900 font-inter">
                  История расходов
                </div>
                <div id="avgDesktop" class="text-[12px] font-normal leading-[1.4] text-blue-500 font-inter">
                  Средние траты в день: ${formatNumber(avgSpent)} ₽
                </div>
              </div>

              <div id="historyListDesktop" class="flex flex-col gap-2">
                ${renderExpensesList(visibleExpenses, false)}
              </div>

              ${
                hasChanges
                  ? `
                    <button
                      id="cancelBtnDesktop"
                      type="button"
                      class="h-12 w-full rounded-[4px] border border-blue-500 bg-white px-4 text-[16px] font-medium leading-[1.5] text-blue-500 hover:bg-blue-500/10 font-inter"
                    >
                      Вернуться без сохранения
                    </button>
                    <button
                      id="saveBtnDesktop"
                      type="button"
                      class="h-12 w-full rounded-[4px] bg-blue-500 px-4 text-[16px] font-medium leading-[1.5] text-white hover:bg-blue-500/85 font-inter"
                    >
                      Сохранить
                    </button>
                  `
                  : `
                    <button
                      id="backBtnDesktop"
                      type="button"
                      class="h-12 w-full rounded-[4px] border border-blue-500 bg-white px-4 text-[16px] font-medium leading-[1.5] text-blue-500 hover:bg-blue-500/10 font-inter"
                    >
                      Вернуться
                    </button>
                  `
              }
            </div>
          </section>
        </div>
      </div>
    `;

    wrapper.querySelector<HTMLButtonElement>('#backBtnMobile')?.addEventListener('click', goMain);
    wrapper.querySelector<HTMLButtonElement>('#backBtnDesktop')?.addEventListener('click', goMain);

    wrapper.querySelector<HTMLButtonElement>('#cancelBtnMobile')?.addEventListener('click', goMain);
    wrapper
      .querySelector<HTMLButtonElement>('#cancelBtnDesktop')
      ?.addEventListener('click', goMain);

    const save = () => {
      void (async () => {
        if (!deletedIds.size) {
          goMain();
          return;
        }

        const ids = Array.from(deletedIds.values());
        await Promise.all(ids.map(id => deleteTransaction(id)));

        const fresh = await getAllTransactions();
        appStore.setState({ transactions: fresh });

        goMain();
      })();
    };

    wrapper.querySelector<HTMLButtonElement>('#saveBtnMobile')?.addEventListener('click', save);
    wrapper.querySelector<HTMLButtonElement>('#saveBtnDesktop')?.addEventListener('click', save);

    const onDeleteClick = (e: Event) => {
      const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('button[data-del-id]');
      if (!btn) {
        return;
      }

      const id = Number(btn.dataset.delId);
      if (!Number.isFinite(id)) {
        return;
      }

      deletedIds.add(id);
      renderAll();
    };

    wrapper
      .querySelector<HTMLElement>('#historyListMobile')
      ?.addEventListener('click', onDeleteClick);
    wrapper
      .querySelector<HTMLElement>('#historyListDesktop')
      ?.addEventListener('click', onDeleteClick);
  };

  renderAll();
  return wrapper;
}

function renderDeleteIcon(): string {
  return `
    <img
      src="/assets/delete.svg"
      alt=""
      class="h-3 w-3"
      aria-hidden="true"
      draggable="false"
    />
  `;
}
