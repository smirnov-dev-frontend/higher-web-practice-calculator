import { deleteTransaction, getAllTransactions } from '../utils/db';
import { averageSpentPerDay, formatMoney, formatRuDayMonth } from '../utils/format';
import { appStore } from '../utils/state';

import type { Transaction } from '../models/schemas';

export function renderHistoryPage(): HTMLElement {
  const state = appStore.getState();
  const wrapper = document.createElement('div');
  wrapper.className = 'min-h-screen bg-slate-50 overflow-x-hidden';

  const budget = state.budget;
  if (!budget) {
    appStore.setState({ route: 'start' });
    return wrapper;
  }

  const originalTxs = (state.transactions as Transaction[]) ?? [];
  const deletedIds = new Set<number>();

  const goMain = () => appStore.setState({ route: 'main' });

  const getVisibleTxs = (): Transaction[] =>
    originalTxs.filter(t => (typeof t.id === 'number' ? !deletedIds.has(t.id) : true));

  const getVisibleExpenses = (): Array<Transaction & { amount: number }> =>
    getVisibleTxs()
      .filter(t => t.type === 'expense')
      .map(t => ({ ...t, amount: Math.abs(t.amount) }));

  const renderExpensesList = (
    expenses: Array<Transaction & { amount: number }>,
    mobile: boolean
  ): string => {
    if (!expenses.length) {
      return `<div class="${mobile ? 'mt-4 ' : ''}history-empty">Пока нет расходов.</div>`;
    }

    return expenses
      .map((t, idx) => {
        const divider =
          idx === expenses.length - 1
            ? ''
            : `<div class="${mobile ? 'history-divider-mobile' : 'history-divider-desktop'}"></div>`;

        const deleteBtn =
          typeof t.id === 'number'
            ? `
              <button
                type="button"
                class="${mobile ? 'icon-btn-mobile' : 'icon-btn-desktop'}"
                aria-label="Удалить"
                data-del-id="${String(t.id)}"
              >
                ${renderDeleteIcon()}
              </button>
            `
            : '';

        const amountWeight = mobile ? 'history-amount-mobile' : 'history-amount-desktop';
        const rowPad = mobile ? 'history-row-mobile' : '';

        return `
          <div class="history-row ${rowPad}">
            <div class="history-amount ${amountWeight}">
              ${formatMoney(t.amount)}
            </div>

            <div class="history-date">
              ${formatRuDayMonth(t.date)}
            </div>

            ${deleteBtn}
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
      <!-- MOBILE (base) -->
      <div class="page-mobile">
        <div class="pb-32">
          <div class="flex flex-col gap-1 min-w-0">
            <div class="min-w-0 break-words history-title">
              История расходов
            </div>

            <div id="avgMobile" class="min-w-0 break-all history-avg">
              Средние траты в день: ${formatMoney(avgSpent)}
            </div>
          </div>

          <div id="historyListMobile" class="mt-6 flex flex-col gap-2 min-w-0">
            ${renderExpensesList(visibleExpenses, true)}
          </div>
        </div>

        <div class="bottom-bar">
          <button
            id="backBtnMobile"
            type="button"
            class="${hasChanges ? 'hidden ' : ''}btn-outline"
          >
            Вернуться
          </button>

          <button
            id="cancelBtnMobile"
            type="button"
            class="${hasChanges ? '' : 'hidden '}btn-outline"
          >
            Вернуться без сохранения
          </button>

          <button
            id="saveBtnMobile"
            type="button"
            class="${hasChanges ? '' : 'hidden '}mt-3 btn-primary"
          >
            Сохранить
          </button>
        </div>
      </div>

      <!-- DESKTOP (enhancement) -->
      <div class="page-desktop-shell">
        <div class="container-narrow">
          <section class="card">
            <div class="flex flex-col gap-6 min-w-0">
              <div class="flex flex-col gap-1 min-w-0">
                <div class="min-w-0 break-words history-title-desktop">
                  История расходов
                </div>
                <div id="avgDesktop" class="min-w-0 break-all history-avg">
                  Средние траты в день: ${formatMoney(avgSpent)}
                </div>
              </div>

              <div id="historyListDesktop" class="flex flex-col gap-2 min-w-0">
                ${renderExpensesList(visibleExpenses, false)}
              </div>

              ${
                hasChanges
                  ? `
                    <button id="cancelBtnDesktop" type="button" class="btn-outline">
                      Вернуться без сохранения
                    </button>
                    <button id="saveBtnDesktop" type="button" class="btn-primary-desktop">
                      Сохранить
                    </button>
                  `
                  : `
                    <button id="backBtnDesktop" type="button" class="btn-outline">
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
      src="assets/delete.svg"
      alt=""
      class="h-3 w-3"
      aria-hidden="true"
      draggable="false"
    />
  `;
}
