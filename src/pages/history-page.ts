import { periodDays, totalExpenses } from '../services/budget-calculator';
import { deleteTransaction, getAllTransactions } from '../utils/db';
import { appStore } from '../utils/state';

function formatMoney(n: number) {
  return `${new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 2 }).format(n)} ₽`;
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

  const txs = state.transactions;
  const expenses = totalExpenses(txs);
  const days = Math.max(1, periodDays(budget));
  const avgExpensePerDay = expenses / days;

  wrapper.innerHTML = `
    <div class="mx-auto max-w-3xl p-4 sm:p-6">
      <header class="mb-6 flex items-start justify-between gap-3">
        <div>
          <h1 class="text-2xl font-bold text-slate-900">История</h1>
          <p class="mt-1 text-sm text-slate-600">
            Средние траты в день:
            <span class="font-semibold text-slate-900">${formatMoney(avgExpensePerDay)}</span>
          </p>
        </div>

        <button
          id="back"
          class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 hover:bg-slate-100"
        >
          Назад
        </button>
      </header>

      <section class="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
        <h2 class="text-lg font-semibold text-slate-900">Все транзакции</h2>

        <div class="mt-4 space-y-2">
          ${txs.length ? txs.map(txItem).join('') : `<p class="text-sm text-slate-600">Пока нет операций.</p>`}
        </div>
      </section>
    </div>
  `;

  wrapper.querySelector<HTMLButtonElement>('#back')?.addEventListener('click', () => {
    appStore.setState({ route: 'main' });
  });

  wrapper.querySelectorAll<HTMLButtonElement>('[data-delete-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      void handleDelete(btn);
    });
  });

  return wrapper;
}

async function handleDelete(btn: HTMLButtonElement): Promise<void> {
  const id = Number(btn.dataset.deleteId);
  if (!Number.isFinite(id)) {
    return;
  }

  await deleteTransaction(id);

  const fresh = await getAllTransactions();
  appStore.setState({ transactions: fresh });
}

function txItem(tx: { id?: number; type: 'expense' | 'income'; amount: number; date: string }) {
  const sign = tx.type === 'expense' ? '−' : '+';
  const tone = tx.type === 'expense' ? 'text-red-600' : 'text-emerald-600';

  return `
    <div class="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2">
      <div class="min-w-0">
        <div class="text-sm text-slate-700">${tx.date}</div>
        <div class="text-sm font-semibold ${tone}">${sign}${tx.amount} ₽</div>
      </div>

      <button
        data-delete-id="${tx.id ?? ''}"
        class="shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 hover:bg-slate-100"
      >
        Удалить
      </button>
    </div>
  `;
}
