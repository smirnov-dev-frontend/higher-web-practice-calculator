import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

import { deleteTransaction, getAllTransactions } from '../utils/db';
import { appStore } from '../utils/state';

import type { Transaction } from '../models/schemas';

function formatRuDayMonth(iso: string): string {
  const d = parseISO(iso);
  return format(d, 'd MMMM', { locale: ru });
}

function averageSpentPerDay(budget: { startDate: string }, txs: Transaction[]): number {
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

  const txs = state.transactions as Transaction[];
  const expenses = txs
    .filter(t => t.type === 'expense')
    .map(t => ({ ...t, amount: Math.abs(t.amount) }));

  const avgSpent = averageSpentPerDay(budget, txs);

  wrapper.innerHTML = `
    <div class="mx-auto flex min-h-screen w-full max-w-[558px] flex-col items-center justify-start px-4 pt-16">
      <section class="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.10)]">
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-1">
            <div class="text-[24px] font-semibold leading-[1.2] text-slate-900">
              История расходов
            </div>
            <div class="text-[12px] font-normal leading-[1.4] text-blue-500">
              Средние траты в день: ${formatNumber(avgSpent)} ₽
            </div>
          </div>

          <div id="historyList" class="flex flex-col gap-2">
            ${
              expenses.length
                ? expenses
                    .map((t, idx) => {
                      const divider =
                        idx === expenses.length - 1
                          ? ''
                          : `<div class="h-px w-full bg-slate-500"></div>`;

                      return `
                        <div class="flex items-baseline gap-3">
                          <div class="flex-1 text-[18px] font-semibold leading-[1.3] text-slate-900">
                            ${formatNumber(t.amount)}
                          </div>

                          <div class="text-[16px] font-normal leading-[1.5] text-slate-500">
                            ${formatRuDayMonth(t.date)}
                          </div>

                          <button
                            type="button"
                            class="ml-1 inline-flex h-6 w-6 items-center justify-center text-slate-500 hover:text-slate-700"
                            aria-label="Удалить"
                            data-del-id="${String(t.id)}"
                          >
                            ${renderXIcon()}
                          </button>
                        </div>
                        ${divider}
                      `;
                    })
                    .join('')
                : `<div class="text-[16px] font-normal leading-[1.5] text-slate-500">Пока нет расходов.</div>`
            }
          </div>

          <button
            id="backBtn"
            type="button"
            class="h-12 w-full rounded-[4px] border border-blue-500 bg-white px-4 text-[16px] font-medium leading-[1.5] text-blue-500 hover:bg-blue-500/10"
          >
            Вернуться
          </button>
        </div>
      </section>
    </div>
  `;

  wrapper.querySelector<HTMLButtonElement>('#backBtn')?.addEventListener('click', () => {
    appStore.setState({ route: 'main' });
  });

  const list = wrapper.querySelector<HTMLElement>('#historyList');
  if (!list) {
    return wrapper;
  }

  list.addEventListener('click', e => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('button[data-del-id]');
    if (!btn) {
      return;
    }

    const id = Number(btn.dataset.delId);
    if (!Number.isFinite(id)) {
      return;
    }

    void (async () => {
      await deleteTransaction(id);
      const fresh = await getAllTransactions();
      appStore.setState({ transactions: fresh });
    })();
  });

  return wrapper;
}

function renderXIcon(): string {
  return `
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 2L10 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M10 2L2 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  `;
}
