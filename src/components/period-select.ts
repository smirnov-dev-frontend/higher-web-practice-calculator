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

function parseISODate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function pluralDays(n: number): string {
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
  return `${days} ${pluralDays(days)} (${formatUntil(end)})`;
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, ch => {
    switch (ch) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      case "'":
        return '&#039;';
      default:
        return ch;
    }
  });
}

function capitalizeRuMonth(s: string): string {
  if (!s) {
    return s;
  }
  return s.charAt(0).toUpperCase() + s.slice(1);
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

function enterIconHtml(extraClass: string = ''): string {
  const cls = ['h-2 w-4 select-none', extraClass].filter(Boolean).join(' ');
  return `
    <img
      src="/assets/enter.svg"
      alt=""
      aria-hidden="true"
      draggable="false"
      class="${cls}"
    />
  `;
}

export function PeriodSelect(props: PeriodSelectProps): string {
  const id = escapeHtml(props.id);

  const presetsHtml = PRESETS.map(preset => {
    const right =
      preset.key === 'custom'
        ? ''
        : `<span class="text-slate-500 text-[16px] leading-[1.5]" id="${id}__right_${preset.key}"></span>`;

    return `
     <li class="py-[2px] border-t border-slate-200 first:border-t-0">
        <button
          type="button"
          class="flex w-full items-center justify-between rounded-[4px] px-3 py-2 text-left text-[16px] leading-[1.5] text-slate-700 hover:bg-blue-500/10 hover:text-blue-500"
          data-preset="${preset.key}"
        >
          <span>${preset.label}</span>
          ${right}
        </button>
      </li>
    `;
  }).join('');

  return `
    <div class="relative">
      <input id="${id}" name="${id}" type="hidden" value="" />

      <button
        type="button"
        id="${id}__trigger"
        class="flex h-12 w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-3 text-[16px] font-normal leading-[1.5] text-slate-500 outline-none focus:border-2 focus:border-blue-500"
        aria-haspopup="listbox"
        aria-expanded="false"
      >
        <span id="${id}__text">Выберите срок</span>
        <span class="ml-3 text-slate-500">
          ${enterIconHtml('')}
        </span>
      </button>

      <div
        id="${id}__panel"
        class="absolute left-0 z-20 mt-2 hidden w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg"
      >
        <div id="${id}__modeList" class="p-3">
          <ul class="space-y-0" role="listbox" id="${id}__list">
            ${presetsHtml}
          </ul>
        </div>

        <div id="${id}__modeCalendar" class="hidden">
          <div class="relative flex w-full flex-col items-start gap-2 bg-white p-[12px_12px_8px] shadow-[0_4px_16px_rgba(0,0,0,0.12)] rounded-t-xl">
            <button
              type="button"
              id="${id}__prev"
              class="absolute left-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-md text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-transparent"
              aria-label="Предыдущий месяц"
            >
              ${enterIconHtml('rotate-90')}
            </button>

            <button
              type="button"
              id="${id}__next"
              class="absolute right-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-md text-slate-900 hover:bg-slate-50"
              aria-label="Следующий месяц"
            >
              ${enterIconHtml('-rotate-90')}
            </button>

            <div class="flex w-full min-w-0 flex-col items-start gap-1 px-10">
              <div class="flex h-[23px] w-full items-center justify-between px-2">
                <div id="${id}__month" class="text-[18px] font-semibold leading-[1.3] text-slate-900"></div>
                <div id="${id}__year" class="text-[18px] font-semibold leading-[1.3] text-slate-900"></div>
              </div>

              <div class="flex w-full flex-col items-start p-2">
                <div class="grid w-full grid-cols-7 gap-[2px]">
                  <div class="flex h-[17px] items-start justify-center px-2 text-[12px] leading-[1.4] text-slate-500">пн</div>
                  <div class="flex h-[17px] items-start justify-center px-2 text-[12px] leading-[1.4] text-slate-500">вт</div>
                  <div class="flex h-[17px] items-start justify-center px-2 text-[12px] leading-[1.4] text-slate-500">ср</div>
                  <div class="flex h-[17px] items-start justify-center px-2 text-[12px] leading-[1.4] text-slate-500">чт</div>
                  <div class="flex h-[17px] items-start justify-center px-2 text-[12px] leading-[1.4] text-slate-500">пт</div>
                  <div class="flex h-[17px] items-start justify-center px-2 text-[12px] leading-[1.4] text-slate-500">сб</div>
                  <div class="flex h-[17px] items-start justify-center px-2 text-[12px] leading-[1.4] text-slate-500">вс</div>
                </div>

                <div id="${id}__grid" class="mt-[2px] grid w-full grid-cols-7 gap-[2px]"></div>
              </div>
            </div>
          </div>

          <div class="border-t border-slate-200"></div>
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
    const rightEl = root.querySelector<HTMLElement>(
      `#${CSS.escape(props.id)}__right_${preset.key}`
    );

    if (end && rightEl) {
      rightEl.textContent = formatUntil(end);
    }
  });

  let open = false;
  let calendarMonth = startOfMonth(today);

  const updateTextFromValue = () => {
    if (!hidden.value) {
      text.textContent = 'Выберите срок';
      trigger.classList.add('text-slate-500');
      trigger.classList.remove('text-slate-900');
      return;
    }

    const end = parseISODate(hidden.value);
    text.textContent = displayValue(today, end);
    trigger.classList.remove('text-slate-500');
    trigger.classList.add('text-slate-900');
  };

  const setExpanded = (v: boolean) => {
    open = v;
    trigger.setAttribute('aria-expanded', String(v));
    panel.classList.toggle('hidden', !v);

    if (v) {
      modeList.classList.remove('hidden');
      modeCalendar.classList.add('hidden');
      updateTextFromValue();
    } else {
      updateTextFromValue();
    }
  };

  const close = () => {
    setExpanded(false);
  };

  const openPanel = () => {
    setExpanded(true);
  };

  const setSelectedEnd = (end: Date) => {
    hidden.value = toISODate(end);
    updateTextFromValue();
    close();
  };

  const updatePrevDisabled = () => {
    const prevMonth = startOfMonth(addMonths(calendarMonth, -1));
    const canGoPrev = monthHasSelectableDates(prevMonth, today);
    prevBtn.disabled = !canGoPrev;
  };

  const renderCalendar = () => {
    monthEl.textContent = capitalizeRuMonth(format(calendarMonth, 'LLLL', { locale: ru }));
    yearEl.textContent = format(calendarMonth, 'yyyy', { locale: ru });

    grid.innerHTML = '';

    const start = startOfWeek(startOfMonth(calendarMonth), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(calendarMonth), { weekStartsOn: 1 });

    let d = start;
    while (d <= end) {
      const inMonth = d.getMonth() === calendarMonth.getMonth();
      const disabled = differenceInCalendarDays(d, today) <= 0;
      const selected = hidden.value ? isSameDay(d, parseISODate(hidden.value)) : false;

      const base =
        'flex w-full items-center justify-center h-[64.61px] rounded-[4px] text-[16px] leading-[1.5] font-normal';

      const cls = [
        base,
        !inMonth ? 'pointer-events-none bg-white text-[#F9FAFB]' : '',
        inMonth && disabled ? 'pointer-events-none bg-white text-[#F9FAFB]' : '',
        inMonth && !disabled && selected ? 'bg-blue-500 text-white hover:bg-blue-500/85' : '',
        inMonth && !disabled && !selected ? 'bg-[#F9FAFB] text-slate-900 hover:bg-slate-100' : '',
      ]
        .filter(Boolean)
        .join(' ');

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = cls;
      btn.textContent = String(d.getDate());

      if (inMonth && !disabled) {
        const date = new Date(d);
        btn.addEventListener('click', () => {
          setSelectedEnd(date);
        });
      }

      grid.append(btn);
      d = addDays(d, 1);
    }

    updatePrevDisabled();
  };

  trigger.addEventListener('click', () => {
    if (open) {
      close();
    } else {
      openPanel();
    }
  });

  document.addEventListener('click', e => {
    const target = e.target as Node;
    if (!open) {
      return;
    }
    if (!root.contains(target)) {
      close();
    }
  });

  list.addEventListener('click', e => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('button[data-preset]');
    if (!btn) {
      return;
    }

    const key = btn.dataset.preset as PresetKey;

    if (key === 'custom') {
      modeList.classList.add('hidden');
      modeCalendar.classList.remove('hidden');

      text.textContent = 'Выбор даты';
      trigger.classList.add('text-slate-500');
      trigger.classList.remove('text-slate-900');

      if (hidden.value) {
        calendarMonth = startOfMonth(parseISODate(hidden.value));
      } else {
        calendarMonth = startOfMonth(today);
      }

      renderCalendar();
      return;
    }

    const endDate = computeEndDate(today, key);
    if (!endDate) {
      return;
    }

    setSelectedEnd(endDate);
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

  updateTextFromValue();
}
