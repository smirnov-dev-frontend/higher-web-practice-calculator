import { escapeHtml } from '../utils/html';

export interface InputFieldProps {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  inputmode?: string;
  min?: string;
  value?: string;
}

export function InputField(props: InputFieldProps): string {
  const { id, label, type = 'text', placeholder = '', inputmode, min, value = '' } = props;

  const inputmodeAttr = inputmode ? `inputmode="${escapeHtml(inputmode)}"` : '';
  const minAttr = min ? `min="${escapeHtml(min)}"` : '';

  const safeId = escapeHtml(id);

  return `
    <label class="block">
      ${label ? `<span class="text-sm text-slate-600">${escapeHtml(label)}</span>` : ''}
      <input
        id="${safeId}"
        name="${safeId}"
        type="${escapeHtml(type)}"
        ${inputmodeAttr}
        ${minAttr}
        value="${escapeHtml(value)}"
        placeholder="${escapeHtml(placeholder)}"
        class="mt-1 h-12 w-full rounded-lg border border-slate-200 bg-white px-3 text-[16px] font-normal leading-[1.5] text-slate-900 placeholder:text-slate-500 outline-none focus:border-2 focus:border-blue-500"
      />
    </label>
  `;
}
