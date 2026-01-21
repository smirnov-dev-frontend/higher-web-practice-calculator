import { InputField } from '../components/input';
import { initPeriodSelect, PeriodSelect } from '../components/period-select';
import { plannedDailyBudget, remainingDays, totalBalance } from '../services/budget-calculator';
import { formatISODate } from '../utils/dates';
import { saveBudget } from '../utils/db';
import { appStore } from '../utils/state';
import { attachMoneyInput, formatRubles, parseBudgetForm } from '../utils/validation';

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

function parseRublesLocal(raw: string): number {
  const digits = raw.replace(/[^\d]/g, '');
  if (!digits) {
    return 0;
  }
  return Number(digits);
}

function attachPlusMoneyInput(input: HTMLInputElement): void {
  const basePlaceholder = '+0 ₽';
  const focusPlaceholder = '+0 ₽';

  const setCaretBeforeCurrency = () => {
    const pos = Math.max(0, input.value.length - 2);
    input.setSelectionRange(pos, pos);
  };

  const applyFormat = () => {
    const digits = input.value.replace(/[^\d]/g, '');
    if (!digits) {
      input.value = '';
      return;
    }

    const formatted = formatRubles(Number(digits));
    input.value = `+${formatted}`;
    requestAnimationFrame(setCaretBeforeCurrency);
  };

  input.placeholder = basePlaceholder;

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

export function renderStartPage(): HTMLElement {
  const state = appStore.getState();
  const wrapper = document.createElement('div');

  const today = formatISODate(new Date());
  const budget = state.budget;

  if (budget) {
    const txs = state.transactions;

    const total = totalBalance(budget, txs);
    const daily = plannedDailyBudget(budget);
    const daysLeft = remainingDays(budget, today);

    wrapper.innerHTML = `
      <div class="min-h-screen bg-slate-50">
        <div class="mx-auto flex w-full max-w-[558px] flex-col gap-2 px-4 pt-16 pb-6">
          <section class="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.10)]">
            <div class="flex flex-col gap-6">
              <div class="flex flex-col gap-3">
                <div class="flex items-baseline gap-2">
                  <div class="flex-1 text-[24px] font-semibold leading-[1.2] text-slate-500 font-inter">
                    Общий баланс
                  </div>

                  <div class="text-[16px] font-normal leading-[1.5] text-blue-500 font-inter">
                    ${formatMoney(daily)} в день
                  </div>
                </div>

                <div class="flex items-baseline gap-2">
                  <div class="text-[32px] font-bold leading-[1.2] text-slate-900 font-inter">
                    ${formatMoney(total)}
                  </div>
                  <div class="text-[16px] font-normal leading-[1.5] text-slate-500 font-inter">
                    на ${daysLeft} ${pluralDaysRu(daysLeft)}
                  </div>
                </div>
              </div>

              <form id="editBudgetForm" class="flex w-full flex-col gap-4">
                <div class="flex flex-col gap-1">
                  <div class="ml-3 font-inter font-normal text-slate-500" style="font-size: 12px; line-height: 140%;">
                    Пополнить
                  </div>

                  <input
                    id="topUp"
                    name="topUp"
                    type="text"
                    inputmode="numeric"
                    placeholder="+0 ₽"
                    class="h-12 w-full rounded-lg border-2 border-blue-500 bg-white px-3 text-[16px] font-normal leading-[1.5] text-slate-900 outline-none font-inter"
                  />
                </div>
                
                <div class="flex flex-col gap-1">
                  <div class="ml-3 font-inter font-normal text-slate-500" style="font-size: 12px; line-height: 140%;">
                    На срок
                  </div>
                  ${PeriodSelect({ id: 'endDate', minDateISO: today })}
                </div>

                <p id="editFormError" class="hidden text-sm text-red-600"></p>

                <button
                  type="submit"
                  id="saveEditBtn"
                  class="h-12 w-full rounded-[4px] bg-blue-500 px-4 text-[16px] font-medium leading-[1.5] text-white hover:bg-blue-500/85 font-inter transition-colors duration-150"
                >
                  Сохранить
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    `;

    const endHidden = wrapper.querySelector<HTMLInputElement>('#endDate');
    if (endHidden) {
      endHidden.value = budget.endDate;
    }

    initPeriodSelect(wrapper, { id: 'endDate', minDateISO: today });

    const topUpInput = wrapper.querySelector<HTMLInputElement>('#topUp');
    if (topUpInput) {
      attachPlusMoneyInput(topUpInput);
    }

    const form = wrapper.querySelector<HTMLFormElement>('#editBudgetForm');
    const errorEl = wrapper.querySelector<HTMLParagraphElement>('#editFormError');

    if (!form || !errorEl) {
      return wrapper;
    }

    form.addEventListener('submit', e => {
      e.preventDefault();
      void handleEditSubmit(wrapper, errorEl);
    });

    return wrapper;
  }

  wrapper.innerHTML = `
    <div class="min-h-screen bg-slate-50">
      <div class="mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center pb-16 px-4">
        <div class="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-md" style="max-width: 558px;">
          <h1 class="text-slate-900 font-inter font-bold" style="font-size: 32px; line-height: 120%;">
            Начнём!
          </h1>

          <form id="budgetForm" class="mt-6 flex w-full flex-col gap-4">
            <div class="flex flex-col gap-1">
              <div class="ml-3 font-inter font-normal text-slate-500" style="font-size: 12px; line-height: 140%;">
                Укажите баланс
              </div>
              ${InputField({
                id: 'initialBalance',
                type: 'text',
                inputmode: 'numeric',
                placeholder: 'Стартовый баланс',
              })}
            </div>

            <div class="flex flex-col gap-1">
              <div class="ml-3 font-inter font-normal text-slate-500" style="font-size: 12px; line-height: 140%;">
                На срок
              </div>
              ${PeriodSelect({ id: 'endDate', minDateISO: today })}
            </div>

            <p id="formError" class="hidden text-sm text-red-600"></p>

            <button
              type="submit"
              id="calculateBtn"
              class="h-12 w-full rounded px-4 text-white font-inter font-medium transition-colors duration-150"
              style="background: #3B82F6; font-size: 16px; line-height: 150%;"
            >
              Рассчитать
            </button>
          </form>
        </div>
      </div>
    </div>
  `;

  const form = wrapper.querySelector<HTMLFormElement>('#budgetForm');
  const errorEl = wrapper.querySelector<HTMLParagraphElement>('#formError');

  if (!form || !errorEl) {
    return wrapper;
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    void handleCreateSubmit(wrapper, errorEl);
  });

  const balanceInput = wrapper.querySelector<HTMLInputElement>('#initialBalance');
  if (balanceInput) {
    attachMoneyInput(balanceInput, { emptyPlaceholder: 'Стартовый баланс' });
  }

  initPeriodSelect(wrapper, { id: 'endDate', minDateISO: today });

  const calcBtn = wrapper.querySelector<HTMLButtonElement>('#calculateBtn');
  if (calcBtn) {
    const base = '#3B82F6';
    const hover = 'rgba(59,130,246,0.85)';

    calcBtn.addEventListener('mouseenter', () => {
      calcBtn.style.background = hover;
    });

    calcBtn.addEventListener('mouseleave', () => {
      calcBtn.style.background = base;
    });
  }

  return wrapper;
}

async function handleCreateSubmit(
  wrapper: HTMLElement,
  errorEl: HTMLParagraphElement
): Promise<void> {
  errorEl.classList.add('hidden');
  errorEl.textContent = '';

  const initialBalance = (
    wrapper.querySelector<HTMLInputElement>('#initialBalance')?.value ?? ''
  ).trim();
  const startDate = formatISODate(new Date());
  const endDate = (wrapper.querySelector<HTMLInputElement>('#endDate')?.value ?? '').trim();

  const parsed = parseBudgetForm({ initialBalance, startDate, endDate });

  if (!parsed.ok) {
    errorEl.textContent = parsed.error;
    errorEl.classList.remove('hidden');
    return;
  }

  await saveBudget(parsed.value);

  appStore.setState({
    budget: parsed.value,
    route: 'main',
    error: null,
  });
}

async function handleEditSubmit(
  wrapper: HTMLElement,
  errorEl: HTMLParagraphElement
): Promise<void> {
  const state = appStore.getState();
  const budget = state.budget;

  if (!budget) {
    return;
  }

  errorEl.classList.add('hidden');
  errorEl.textContent = '';

  const topUpRaw = (wrapper.querySelector<HTMLInputElement>('#topUp')?.value ?? '').trim();
  const endDate = (wrapper.querySelector<HTMLInputElement>('#endDate')?.value ?? '').trim();

  if (!endDate) {
    errorEl.textContent = 'Выберите срок';
    errorEl.classList.remove('hidden');
    return;
  }

  const topUp = parseRublesLocal(topUpRaw);

  const updatedBudget = {
    ...budget,
    initialBalance: budget.initialBalance + topUp,
    endDate,
  };

  await saveBudget(updatedBudget);

  appStore.setState({
    budget: updatedBudget,
    route: 'main',
    error: null,
  });
}
