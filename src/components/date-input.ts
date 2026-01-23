import {
  addDays,
  addMonths,
  differenceInCalendarDays,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { ru } from 'date-fns/locale';

import { parseISODate, toISODate } from '../utils/dates';
import { pluralDaysRu } from '../utils/format';
import { escapeHtml } from '../utils/html';

interface PeriodSelectProps {
  id: string;
  minDateISO: string;
}

type PresetKey = 'day' | 'week' | 'twoWeeks' | 'month' | 'endOfMonth' | 'custom';

const PRESETS: Array<{ key: PresetKey; label: string }> = [
  { key: 'day', label: 'День' },
  { key: 'week', label: 'Неделя' },
  { key: 'twoWeeks', label: '2 недели' },
  { key: 'month', label: 'Месяц' },
  { key: 'endOfMonth', label: 'До конца месяца' },
  { key: 'custom', label: 'Своя дата' },
];

const WEEKDAYS_RU = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'] as const;

function formatUntil(date: Date): string {
  return `до ${format(date, 'd MMMM', { locale: ru })}`;
}

function computeEndDate(today: Date, key: PresetKey): Date | null {
  if (key === 'day') {
    return addDays(today, 1);
  }
  if (key === 'week') {
    return addDays(today, 7);
  }
  if (key === 'twoWeeks') {
    return addDays(today, 14);
  }
  if (key === 'month') {
    return addMonths(today, 1);
  }
  if (key === 'endOfMonth') {
    return endOfMonth(today);
  }
  return null;
}

function displayValue(today: Date, end: Date): string {
  const days = differenceInCalendarDays(end, today);
  return `${days} ${pluralDaysRu(days)} (${formatUntil(end)})`;
}

function capitalizeRuMonth(s: string): string {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

function monthHasSelectableDates(monthStart: Date, today: Date): boolean {
  const monthEnd = endOfMonth(monthStart);
  let d = monthStart;

  while (d <= monthEnd) {
    if (differenceInCalendarDays(d, today) > 0) {
      return true;
    }
    d = addDays(d, 1);
  }
  return false;
}

function enterIconHtml(extraClass = ''): string {
  return `
    <img
      src="assets/enter.svg"
      alt=""
      aria-hidden="true"
      draggable="false"
      class="h-2 w-4 select-none ${extraClass}"
    />
  `;
}

export function PeriodSelect(props: PeriodSelectProps): string {
  const id = escapeHtml(props.id);

  const presetsHtml = PRESETS.map(preset => {
    const right =
      preset.key === 'custom'
        ? ''
        : `<span class="ps-preset-right" id="${id}__right_${preset.key}"></span>`;

    return `
      <li class="ps-item">
        <button
          type="button"
          class="ps-preset-btn"
          data-preset="${preset.key}"
        >
          <span>${preset.label}</span>
          ${right}
        </button>
      </li>
    `;
  }).join('');

  const weekdaysHtml = WEEKDAYS_RU.map(d => `<div class="ps-weekday">${d}</div>`).join('');

  return `
    <div class="ps-root">
      <input id="${id}" name="${id}" type="hidden" />

      <button
        type="button"
        id="${id}__trigger"
        class="ps-trigger ps-trigger-muted"
        aria-haspopup="listbox"
        aria-expanded="false"
        aria-controls="${id}__panel"
      >
        <span id="${id}__text">Выберите срок</span>
        <span class="ps-trigger-icon">${enterIconHtml()}</span>
      </button>

      <div id="${id}__panel" class="ps-panel">
        <div id="${id}__modeList" class="ps-mode-list">
          <ul id="${id}__list" class="ps-list" role="listbox">
            ${presetsHtml}
          </ul>
        </div>

        <div id="${id}__modeCalendar" class="ps-calendar">
          <div class="ps-cal-wrap">
            <button id="${id}__prev" class="ps-nav-btn ps-nav-btn-prev" type="button">
              ${enterIconHtml('rotate-90')}
            </button>

            <button id="${id}__next" class="ps-nav-btn ps-nav-btn-next" type="button">
              ${enterIconHtml('-rotate-90')}
            </button>

            <div class="ps-cal-inner">
              <div class="ps-cal-title-row">
                <div id="${id}__month" class="ps-cal-title"></div>
                <div id="${id}__year" class="ps-cal-title"></div>
              </div>

              <div class="ps-cal-body">
                <div class="ps-weekdays">${weekdaysHtml}</div>
                <div id="${id}__grid" class="ps-grid"></div>
              </div>
            </div>
          </div>

          <div class="ps-divider"></div>
        </div>
      </div>
    </div>
  `;
}

export function initPeriodSelect(root: HTMLElement, props: PeriodSelectProps): void {
  const today = parseISODate(props.minDateISO);

  const hidden = root.querySelector<HTMLInputElement>(`#${CSS.escape(props.id)}`);
  const trigger = root.querySelector<HTMLButtonElement>(`#${CSS.escape(props.id)}__trigger`);
  const text = root.querySelector<HTMLElement>(`#${CSS.escape(props.id)}__text`);
  const panel = root.querySelector<HTMLElement>(`#${CSS.escape(props.id)}__panel`);
  const modeList = root.querySelector<HTMLElement>(`#${CSS.escape(props.id)}__modeList`);
  const modeCalendar = root.querySelector<HTMLElement>(`#${CSS.escape(props.id)}__modeCalendar`);
  const list = root.querySelector<HTMLElement>(`#${CSS.escape(props.id)}__list`);
  const prevBtn = root.querySelector<HTMLButtonElement>(`#${CSS.escape(props.id)}__prev`);
  const nextBtn = root.querySelector<HTMLButtonElement>(`#${CSS.escape(props.id)}__next`);
  const monthEl = root.querySelector<HTMLElement>(`#${CSS.escape(props.id)}__month`);
  const yearEl = root.querySelector<HTMLElement>(`#${CSS.escape(props.id)}__year`);
  const grid = root.querySelector<HTMLElement>(`#${CSS.escape(props.id)}__grid`);

  if (
    !hidden ||
    !trigger ||
    !text ||
    !panel ||
    !modeList ||
    !modeCalendar ||
    !list ||
    !prevBtn ||
    !nextBtn ||
    !monthEl ||
    !yearEl ||
    !grid
  ) {
    return;
  }

  PRESETS.forEach(preset => {
    if (preset.key === 'custom') {
      return;
    }
    const end = computeEndDate(today, preset.key);
    const right = root.querySelector<HTMLElement>(`#${CSS.escape(props.id)}__right_${preset.key}`);
    if (end && right) {
      right.textContent = formatUntil(end);
    }
  });

  let open = false;
  let calendarMonth = startOfMonth(today);

  const updateText = () => {
    if (!hidden.value) {
      text.textContent = 'Выберите срок';
      trigger.classList.add('ps-trigger-muted');
      trigger.classList.remove('ps-trigger-active');
      return;
    }

    const end = parseISODate(hidden.value);
    text.textContent = displayValue(today, end);
    trigger.classList.remove('ps-trigger-muted');
    trigger.classList.add('ps-trigger-active');
  };

  const setOpen = (v: boolean) => {
    open = v;
    panel.classList.toggle('hidden', !v);
    trigger.setAttribute('aria-expanded', String(v));
    modeList.classList.toggle('hidden', !v);
    modeCalendar.classList.add('hidden');
    updateText();
  };

  const setValue = (date: Date) => {
    hidden.value = toISODate(date);
    hidden.dispatchEvent(new Event('change', { bubbles: true }));
    setOpen(false);
  };

  const renderCalendar = () => {
    monthEl.textContent = capitalizeRuMonth(format(calendarMonth, 'LLLL', { locale: ru }));
    yearEl.textContent = format(calendarMonth, 'yyyy', { locale: ru });
    grid.innerHTML = '';

    let d = startOfWeek(startOfMonth(calendarMonth), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(calendarMonth), { weekStartsOn: 1 });

    while (d <= end) {
      const inMonth = d.getMonth() === calendarMonth.getMonth();
      const disabled = differenceInCalendarDays(d, today) <= 0;
      const selected = hidden.value && isSameDay(d, parseISODate(hidden.value));

      const cls = [
        'ps-day',
        !inMonth && 'ps-day-out',
        inMonth && disabled && 'ps-day-disabled',
        inMonth && !disabled && selected && 'ps-day-selected',
        inMonth && !disabled && !selected && 'ps-day-available',
      ]
        .filter(Boolean)
        .join(' ');

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = cls;
      btn.textContent = String(d.getDate());

      if (inMonth && !disabled) {
        btn.addEventListener('click', () => setValue(new Date(d)));
      }

      grid.append(btn);
      d = addDays(d, 1);
    }

    prevBtn.disabled = !monthHasSelectableDates(startOfMonth(addMonths(calendarMonth, -1)), today);
  };

  trigger.addEventListener('click', () => setOpen(!open));
  document.addEventListener(
    'click',
    e => open && !root.contains(e.target as Node) && setOpen(false)
  );
  document.addEventListener('keydown', e => e.key === 'Escape' && setOpen(false));

  list.addEventListener('click', e => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('button[data-preset]');
    if (!btn) {
      return;
    }

    const key = btn.dataset.preset as PresetKey;
    if (key === 'custom') {
      modeList.classList.add('hidden');
      modeCalendar.classList.remove('hidden');
      calendarMonth = hidden.value ? startOfMonth(parseISODate(hidden.value)) : startOfMonth(today);
      renderCalendar();
      return;
    }

    const end = computeEndDate(today, key);
    if (end) {
      setValue(end);
    }
  });

  prevBtn.addEventListener('click', () => {
    if (prevBtn.disabled) {
      return;
    }
    calendarMonth = startOfMonth(addMonths(calendarMonth, -1));
    renderCalendar();
  });

  nextBtn.addEventListener('click', () => {
    calendarMonth = startOfMonth(addMonths(calendarMonth, 1));
    renderCalendar();
  });

  updateText();
}
