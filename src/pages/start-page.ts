import { InputField } from '../components/input';
import { initPeriodSelect, PeriodSelect } from '../components/period-select';
import { plannedDailyBudget, remainingDays, totalBalance } from '../services/budget-calculator';
import { formatISODate } from '../utils/dates';
import { saveBudget } from '../utils/db';
import { formatMoney, pluralDaysRu, parseRubDigitsToNumber } from '../utils/format';
import { appStore } from '../utils/state';
import { attachMoneyInput, formatRubles, parseBudgetForm } from '../utils/validation';

function attachPlusMoneyInput(input: HTMLInputElement): void {
  const basePlaceholder = '+0 ₽';

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
    input.placeholder = basePlaceholder;
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

  const todayISO = formatISODate(new Date());
  const budget = state.budget;

  if (budget) {
    const txs = state.transactions;

    const total = totalBalance(budget, txs);
    const daily = plannedDailyBudget(budget);
    const daysLeft = remainingDays(budget, todayISO);

    wrapper.innerHTML = `
      <div class="min-[704px]:hidden min-h-screen bg-white px-4 py-8">
        <div class="pb-28">
          <div class="flex items-baseline justify-between gap-3">
            <div class="font-inter text-[32px] font-bold leading-[1.2] text-slate-900">
              Общий баланс
            </div>
            <div class="font-inter text-[18px] font-normal leading-[1.3] text-blue-500">
              ${formatMoney(daily)} в день
            </div>
          </div>

          <form id="editBudgetFormMobile" class="mt-6 flex w-full flex-col gap-4">
            <div class="flex flex-col gap-1">
              <div class="ml-3 font-inter text-[12px] font-normal leading-[1.4] text-slate-500">
                Ваш баланс
              </div>
              ${InputField({
                id: 'currentBalanceMobile',
                type: 'text',
                inputmode: 'numeric',
                placeholder: '0 ₽',
              })}
            </div>

            <div class="flex flex-col gap-1">
              <div class="ml-3 font-inter text-[12px] font-normal leading-[1.4] text-slate-500">
                Пополнить
              </div>
              <input
                id="topUpMobile"
                name="topUpMobile"
                type="text"
                inputmode="numeric"
                placeholder="+0 ₽"
                class="h-12 w-full rounded-lg border border-slate-200 bg-white px-3 font-inter text-[16px] font-normal leading-[1.5] text-slate-900 outline-none focus:border-2 focus:border-blue-500"
              />
            </div>

            <div class="flex flex-col gap-1">
              <div class="ml-3 font-inter text-[12px] font-normal leading-[1.4] text-slate-500">
                На срок
              </div>
              ${PeriodSelect({ id: 'endDateMobileEdit', minDateISO: todayISO })}
            </div>

            <p id="editFormErrorMobile" class="hidden text-sm text-red-600"></p>
          </form>
        </div>

        <div class="fixed inset-x-0 bottom-0 bg-white px-4 pb-8 pt-4">
          <button
            type="button"
            id="backBtnMobile"
            class="h-12 w-full rounded border border-blue-500 bg-white px-4 font-inter text-[16px] font-medium leading-[1.5] text-blue-500 transition-colors duration-150 hover:bg-blue-500/10"
          >
            Вернуться
          </button>

          <button
            type="button"
            id="cancelBtnMobile"
            class="hidden mt-3 h-12 w-full rounded border border-blue-500 bg-white px-4 font-inter text-[16px] font-medium leading-[1.5] text-blue-500 transition-colors duration-150 hover:bg-blue-500/10"
          >
            Вернуться без сохранения
          </button>

          <button
            type="submit"
            form="editBudgetFormMobile"
            id="saveBtnMobile"
            class="hidden mt-3 h-12 w-full rounded bg-blue-500 px-4 font-inter text-[16px] font-medium leading-[1.5] text-white transition-colors duration-150 hover:bg-blue-500/85"
          >
            Сохранить
          </button>
        </div>
      </div>

      <div class="hidden min-[704px]:flex min-h-screen bg-slate-50 px-4 pt-16 pb-6 flex-col items-center min-[704px]:pt-0 min-[704px]:pb-0 min-[704px]:justify-center min-[1140px]:pt-16 min-[1140px]:pb-6 min-[1140px]:justify-start">
        <div class="w-full flex flex-col gap-2 min-[704px]:w-[524px] min-[1140px]:w-[558px]">
          <section class="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.10)]">
            <div class="flex flex-col gap-6">
              <div class="flex flex-col gap-3">
                <div class="flex items-baseline gap-2">
                  <div class="flex-1 font-inter text-[24px] font-semibold leading-[1.2] text-slate-500">
                    Общий баланс
                  </div>

                  <div class="font-inter text-[16px] font-normal leading-[1.5] text-blue-500">
                    ${formatMoney(daily)} в день
                  </div>
                </div>

                <div class="flex items-baseline gap-2">
                  <div class="font-inter text-[32px] font-bold leading-[1.2] text-slate-900">
                    ${formatMoney(total)}
                  </div>

                  <div class="font-inter text-[16px] font-normal leading-[1.5] text-slate-500">
                    на ${daysLeft} ${pluralDaysRu(daysLeft)}
                  </div>
                </div>
              </div>

              <form id="editBudgetForm" class="flex w-full flex-col gap-4">
                <div class="flex flex-col gap-1">
                  <div class="ml-3 font-inter text-[12px] font-normal leading-[1.4] text-slate-500">
                    Пополнить
                  </div>

                  <input
                    id="topUp"
                    name="topUp"
                    type="text"
                    inputmode="numeric"
                    placeholder="+0 ₽"
                    class="h-12 w-full rounded-lg border border-slate-200 bg-white px-3 font-inter text-[16px] font-normal leading-[1.5] text-slate-900 outline-none focus:border-2 focus:border-blue-500"
                  />
                </div>

                <div class="flex flex-col gap-1">
                  <div class="ml-3 font-inter text-[12px] font-normal leading-[1.4] text-slate-500">
                    На срок
                  </div>
                  ${PeriodSelect({ id: 'endDate', minDateISO: todayISO })}
                </div>

                <p id="editFormError" class="hidden text-sm text-red-600"></p>

                <button
                  type="submit"
                  id="saveEditBtn"
                  class="h-12 w-full rounded-[4px] bg-blue-500 px-4 font-inter text-[16px] font-medium leading-[1.5] text-white transition-colors duration-150 hover:bg-blue-500/85"
                >
                  Сохранить
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    `;

    const endDesktop = wrapper.querySelector<HTMLInputElement>('#endDate');
    if (endDesktop) {
      endDesktop.value = budget.endDate;
    }
    initPeriodSelect(wrapper, { id: 'endDate', minDateISO: todayISO });

    const endMobile = wrapper.querySelector<HTMLInputElement>('#endDateMobileEdit');
    if (endMobile) {
      endMobile.value = budget.endDate;
    }
    initPeriodSelect(wrapper, { id: 'endDateMobileEdit', minDateISO: todayISO });

    const topUpInput = wrapper.querySelector<HTMLInputElement>('#topUp');
    if (topUpInput) {
      attachPlusMoneyInput(topUpInput);
    }

    const currentBalanceMobile = wrapper.querySelector<HTMLInputElement>('#currentBalanceMobile');
    if (currentBalanceMobile) {
      currentBalanceMobile.value = formatRubles(Math.max(0, total));
      attachMoneyInput(currentBalanceMobile, { emptyPlaceholder: '0 ₽' });
    }

    const topUpMobile = wrapper.querySelector<HTMLInputElement>('#topUpMobile');
    if (topUpMobile) {
      attachPlusMoneyInput(topUpMobile);
    }

    const form = wrapper.querySelector<HTMLFormElement>('#editBudgetForm');
    const errorEl = wrapper.querySelector<HTMLParagraphElement>('#editFormError');
    if (form && errorEl) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        void handleEditSubmit(wrapper, errorEl);
      });
    }

    const formMobileEdit = wrapper.querySelector<HTMLFormElement>('#editBudgetFormMobile');
    const errMobileEdit = wrapper.querySelector<HTMLParagraphElement>('#editFormErrorMobile');
    if (formMobileEdit && errMobileEdit) {
      formMobileEdit.addEventListener('submit', e => {
        e.preventDefault();
        void handleEditSubmitMobile(wrapper, errMobileEdit);
      });
    }

    const backBtnMobile = wrapper.querySelector<HTMLButtonElement>('#backBtnMobile');
    const cancelBtnMobile = wrapper.querySelector<HTMLButtonElement>('#cancelBtnMobile');
    const saveBtnMobile = wrapper.querySelector<HTMLButtonElement>('#saveBtnMobile');

    const balanceEl = wrapper.querySelector<HTMLInputElement>('#currentBalanceMobile');
    const topUpEl = wrapper.querySelector<HTMLInputElement>('#topUpMobile');
    const endDateEl = wrapper.querySelector<HTMLInputElement>('#endDateMobileEdit');

    const goBackNoSave = () => {
      appStore.setState({ route: 'main' });
    };

    backBtnMobile?.addEventListener('click', goBackNoSave);
    cancelBtnMobile?.addEventListener('click', goBackNoSave);

    if (backBtnMobile && cancelBtnMobile && saveBtnMobile && balanceEl && topUpEl && endDateEl) {
      const initial = {
        balance: parseRubDigitsToNumber(balanceEl.value),
        topUp: parseRubDigitsToNumber(topUpEl.value),
        endDate: (endDateEl.value ?? '').trim(),
      };

      const hasChanges = () => {
        const now = {
          balance: parseRubDigitsToNumber(balanceEl.value),
          topUp: parseRubDigitsToNumber(topUpEl.value),
          endDate: (endDateEl.value ?? '').trim(),
        };

        return (
          now.balance !== initial.balance ||
          now.topUp !== initial.topUp ||
          now.endDate !== initial.endDate
        );
      };

      const syncButtons = () => {
        const changed = hasChanges();
        backBtnMobile.classList.toggle('hidden', changed);
        cancelBtnMobile.classList.toggle('hidden', !changed);
        saveBtnMobile.classList.toggle('hidden', !changed);
      };

      balanceEl.addEventListener('input', syncButtons);
      topUpEl.addEventListener('input', syncButtons);

      endDateEl.addEventListener('input', syncButtons);
      endDateEl.addEventListener('change', syncButtons);

      syncButtons();
    }

    return wrapper;
  }

  wrapper.innerHTML = `
    <div class="min-[704px]:hidden min-h-screen bg-white px-4 py-8">
      <div class="pb-28">
        <h1 class="font-inter text-[32px] font-bold leading-[1.2] text-slate-900">
          Начнём!
        </h1>

        <form id="budgetFormMobile" class="mt-6 flex w-full flex-col gap-4">
          <div class="flex flex-col gap-1">
            <div class="ml-3 font-inter text-[12px] font-normal leading-[1.4] text-slate-500">
              Укажите баланс
            </div>
            ${InputField({
              id: 'initialBalanceMobile',
              type: 'text',
              inputmode: 'numeric',
              placeholder: 'Стартовый баланс',
            })}
          </div>

          <div class="flex flex-col gap-1">
            <div class="ml-3 font-inter text-[12px] font-normal leading-[1.4] text-slate-500">
              На срок
            </div>
            ${PeriodSelect({ id: 'endDateMobile', minDateISO: todayISO })}
          </div>

          <p id="formErrorMobile" class="hidden text-sm text-red-600"></p>
        </form>
      </div>

      <div class="fixed inset-x-0 bottom-0 bg-white px-4 pb-8 pt-4">
        <button
          type="submit"
          form="budgetFormMobile"
          id="calculateBtnMobile"
          class="hidden h-12 w-full rounded bg-blue-500 px-4 font-inter text-[16px] font-medium leading-[1.5] text-white transition-colors duration-150 hover:bg-blue-500/85"
        >
          Рассчитать
        </button>
      </div>
    </div>

    <div class="hidden min-[704px]:flex min-h-screen w-full flex-col items-center justify-center bg-slate-50 px-4 pb-16">
      <div class="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-md min-[704px]:w-[524px] min-[1140px]:w-[558px]">
        <h1 class="font-inter text-[32px] font-bold leading-[1.2] text-slate-900">
          Начнём!
        </h1>

        <form id="budgetForm" class="mt-6 flex w-full flex-col gap-4">
          <div class="flex flex-col gap-1">
            <div class="ml-3 font-inter text-[12px] font-normal leading-[1.4] text-slate-500">
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
            <div class="ml-3 font-inter text-[12px] font-normal leading-[1.4] text-slate-500">
              На срок
            </div>
            ${PeriodSelect({ id: 'endDate', minDateISO: todayISO })}
          </div>

          <p id="formError" class="hidden text-sm text-red-600"></p>

          <button
            type="submit"
            id="calculateBtn"
            class="h-12 w-full rounded bg-blue-500 px-4 font-inter text-[16px] font-medium leading-[1.5] text-white transition-colors duration-150 hover:bg-blue-500/85"
          >
            Рассчитать
          </button>
        </form>
      </div>
    </div>
  `;

  const form = wrapper.querySelector<HTMLFormElement>('#budgetForm');
  const errorEl = wrapper.querySelector<HTMLParagraphElement>('#formError');

  if (form && errorEl) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      void handleCreateSubmit(wrapper, errorEl, todayISO);
    });

    const balanceInput = wrapper.querySelector<HTMLInputElement>('#initialBalance');
    if (balanceInput) {
      attachMoneyInput(balanceInput, { emptyPlaceholder: 'Стартовый баланс' });
    }

    initPeriodSelect(wrapper, { id: 'endDate', minDateISO: todayISO });
  }

  const formMobile = wrapper.querySelector<HTMLFormElement>('#budgetFormMobile');
  const errorElMobile = wrapper.querySelector<HTMLParagraphElement>('#formErrorMobile');
  const btnMobile = wrapper.querySelector<HTMLButtonElement>('#calculateBtnMobile');
  const balanceInputMobile = wrapper.querySelector<HTMLInputElement>('#initialBalanceMobile');
  const endHiddenMobile = wrapper.querySelector<HTMLInputElement>('#endDateMobile');

  if (formMobile && errorElMobile) {
    formMobile.addEventListener('submit', e => {
      e.preventDefault();
      void handleCreateSubmitMobile(wrapper, errorElMobile, todayISO);
    });
  }

  if (balanceInputMobile) {
    attachMoneyInput(balanceInputMobile, { emptyPlaceholder: 'Стартовый баланс' });
  }

  initPeriodSelect(wrapper, { id: 'endDateMobile', minDateISO: todayISO });

  if (btnMobile && balanceInputMobile && endHiddenMobile) {
    const isValid = () => {
      const amount = parseRubDigitsToNumber(balanceInputMobile.value);
      const hasDate = Boolean(endHiddenMobile.value && endHiddenMobile.value.trim().length > 0);
      return amount > 0 && hasDate;
    };

    const syncButton = () => {
      btnMobile.classList.toggle('hidden', !isValid());
    };

    balanceInputMobile.addEventListener('input', syncButton);
    balanceInputMobile.addEventListener('blur', syncButton);

    endHiddenMobile.addEventListener('input', syncButton);
    endHiddenMobile.addEventListener('change', syncButton);

    syncButton();
  }

  return wrapper;
}

async function handleCreateSubmit(
  wrapper: HTMLElement,
  errorEl: HTMLParagraphElement,
  todayISO: string
): Promise<void> {
  errorEl.classList.add('hidden');
  errorEl.textContent = '';

  const initialBalance = (
    wrapper.querySelector<HTMLInputElement>('#initialBalance')?.value ?? ''
  ).trim();
  const endDate = (wrapper.querySelector<HTMLInputElement>('#endDate')?.value ?? '').trim();

  const parsed = parseBudgetForm({ initialBalance, startDate: todayISO, endDate });

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

async function handleCreateSubmitMobile(
  wrapper: HTMLElement,
  errorEl: HTMLParagraphElement,
  todayISO: string
): Promise<void> {
  errorEl.classList.add('hidden');
  errorEl.textContent = '';

  const initialBalance = (
    wrapper.querySelector<HTMLInputElement>('#initialBalanceMobile')?.value ?? ''
  ).trim();
  const endDate = (wrapper.querySelector<HTMLInputElement>('#endDateMobile')?.value ?? '').trim();

  const parsed = parseBudgetForm({ initialBalance, startDate: todayISO, endDate });

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

  const topUp = parseRubDigitsToNumber(topUpRaw);
  const nextInitialBalance = budget.initialBalance + topUp;

  const parsed = parseBudgetForm({
    initialBalance: String(nextInitialBalance),
    startDate: budget.startDate,
    endDate,
    createdAt: budget.createdAt,
  });

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

async function handleEditSubmitMobile(
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

  const balanceRaw = (
    wrapper.querySelector<HTMLInputElement>('#currentBalanceMobile')?.value ?? ''
  ).trim();
  const topUpRaw = (wrapper.querySelector<HTMLInputElement>('#topUpMobile')?.value ?? '').trim();
  const endDate = (
    wrapper.querySelector<HTMLInputElement>('#endDateMobileEdit')?.value ?? ''
  ).trim();

  const base = parseRubDigitsToNumber(balanceRaw);
  const topUp = parseRubDigitsToNumber(topUpRaw);
  const nextInitialBalance = base + topUp;

  const parsed = parseBudgetForm({
    initialBalance: String(nextInitialBalance),
    startDate: budget.startDate,
    endDate,
    createdAt: budget.createdAt,
  });

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
