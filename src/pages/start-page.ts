import { InputField } from '../components/input';
import { initPeriodSelect, PeriodSelect } from '../components/period-select';
import { formatISODate } from '../utils/dates';
import { saveBudget } from '../utils/db';
import { appStore } from '../utils/state';
import { attachMoneyInput, parseBudgetForm } from '../utils/validation';

export function renderStartPage(): HTMLElement {
  const wrapper = document.createElement('div');

  const today = formatISODate(new Date());

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
    void handleSubmit(wrapper, errorEl);
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

async function handleSubmit(wrapper: HTMLElement, errorEl: HTMLParagraphElement): Promise<void> {
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
