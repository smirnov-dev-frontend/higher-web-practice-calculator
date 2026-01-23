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
  wrapper.className = 'overflow-x-hidden';

  const todayISO = formatISODate(new Date());
  const budget = state.budget;

  if (budget) {
    const txs = state.transactions;

    const total = totalBalance(budget, txs);
    const daily = plannedDailyBudget(budget);
    const daysLeft = remainingDays(budget, todayISO);

    wrapper.innerHTML = `
      <!-- MOBILE (base) -->
      <div class="page-mobile">
        <div class="pb-28">
          <div class="flex flex-wrap items-baseline gap-3 min-w-0">
            <div class="min-w-0   text-[24px] sm:text-[32px] font-bold leading-[1.2] text-slate-900 [overflow-wrap:anywhere]">
              Общий баланс
            </div>
            <div class="shrink-0   text-[14px] sm:text-[18px] font-normal leading-[1.3] text-blue-500">
              ${formatMoney(daily)} в день
            </div>
          </div>

          <form id="editBudgetFormMobile" class="mt-6 flex w-full flex-col gap-4">
            <div class="flex flex-col gap-1">
              <div class="label">Ваш баланс</div>
              ${InputField({
                id: 'currentBalanceMobile',
                type: 'text',
                inputmode: 'numeric',
                placeholder: '0 ₽',
              })}
            </div>

            <div class="flex flex-col gap-1">
              <div class="label">Пополнить</div>
              <input
                id="topUpMobile"
                name="topUpMobile"
                type="text"
                inputmode="numeric"
                placeholder="+0 ₽"
                class="input-base"
              />
            </div>

            <div class="flex flex-col gap-1">
              <div class="label">На срок</div>
              ${PeriodSelect({ id: 'endDateMobileEdit', minDateISO: todayISO })}
            </div>

            <p id="editFormErrorMobile" class="hidden text-sm text-red-600"></p>
          </form>
        </div>

        <div class="bottom-bar">
          <button type="button" id="backBtnMobile" class="btn-outline">
            Вернуться
          </button>

          <button
            type="button"
            id="cancelBtnMobile"
            class="hidden mt-3 btn-outline"
          >
            Вернуться без сохранения
          </button>

          <button
            type="submit"
            form="editBudgetFormMobile"
            id="saveBtnMobile"
            class="hidden mt-3 btn-primary"
          >
            Сохранить
          </button>
        </div>
      </div>

      <!-- DESKTOP (enhancement) -->
      <div class="page-desktop-shell">
        <div class="container-narrow">
          <section class="card">
            <div class="flex flex-col gap-6">
              <div class="flex flex-col gap-3 min-w-0">
                <div class="flex flex-wrap items-baseline gap-2 min-w-0">
                  <div class="min-w-0 flex-1 h2-title [overflow-wrap:anywhere]">
                    Общий баланс
                  </div>

                  <div class="shrink-0   text-[16px] font-normal leading-[1.5] text-blue-500">
                    ${formatMoney(daily)} в день
                  </div>
                </div>

                <div class="flex flex-wrap items-baseline gap-2 min-w-0">
                  <div class="min-w-0   text-[32px] font-bold leading-[1.2] text-slate-900 break-all">
                    ${formatMoney(total)}
                  </div>

                  <div class="shrink-0   text-[16px] font-normal leading-[1.5] text-slate-500">
                    на ${daysLeft} ${pluralDaysRu(daysLeft)}
                  </div>
                </div>
              </div>

              <form id="editBudgetForm" class="flex w-full flex-col gap-4">
                <div class="flex flex-col gap-1">
                  <div class="label">Пополнить</div>
                  <input
                    id="topUp"
                    name="topUp"
                    type="text"
                    inputmode="numeric"
                    placeholder="+0 ₽"
                    class="input-base"
                  />
                </div>

                <div class="flex flex-col gap-1">
                  <div class="label">На срок</div>
                  ${PeriodSelect({ id: 'endDate', minDateISO: todayISO })}
                </div>

                <p id="editFormError" class="hidden text-sm text-red-600"></p>

                <button type="submit" id="saveEditBtn" class="btn-primary-desktop">
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
    <!-- MOBILE (base) -->
    <div class="page-mobile">
      <div class="pb-28">
        <h1 class="h1-title">Начнём!</h1>

        <form id="budgetFormMobile" class="mt-6 flex w-full flex-col gap-4">
          <div class="flex flex-col gap-1">
            <div class="label">Укажите баланс</div>
            ${InputField({
              id: 'initialBalanceMobile',
              type: 'text',
              inputmode: 'numeric',
              placeholder: 'Стартовый баланс',
            })}
          </div>

          <div class="flex flex-col gap-1">
            <div class="label">На срок</div>
            ${PeriodSelect({ id: 'endDateMobile', minDateISO: todayISO })}
          </div>

          <p id="formErrorMobile" class="hidden text-sm text-red-600"></p>
        </form>
      </div>

      <div class="bottom-bar">
        <button
          type="submit"
          form="budgetFormMobile"
          id="calculateBtnMobile"
          class="hidden btn-primary"
        >
          Рассчитать
        </button>
      </div>
    </div>

    <!-- DESKTOP (enhancement) -->
    <div class="page-desktop-shell">
      <div class="container-narrow">
        <section class="card shadow-md">
          <h1 class="h1-title">Начнём!</h1>

          <form id="budgetForm" class="mt-6 flex w-full flex-col gap-4">
            <div class="flex flex-col gap-1">
              <div class="label">Укажите баланс</div>
              ${InputField({
                id: 'initialBalance',
                type: 'text',
                inputmode: 'numeric',
                placeholder: 'Стартовый баланс',
              })}
            </div>

            <div class="flex flex-col gap-1">
              <div class="label">На срок</div>
              ${PeriodSelect({ id: 'endDate', minDateISO: todayISO })}
            </div>

            <p id="formError" class="hidden text-sm text-red-600"></p>

            <button type="submit" id="calculateBtn" class="btn-primary">
              Рассчитать
            </button>
          </form>
        </section>
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
