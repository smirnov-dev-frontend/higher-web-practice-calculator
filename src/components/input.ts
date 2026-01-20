export function InputField(props: {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  inputmode?: string;
  min?: string;
  value?: string;
}) {
  const { id, label, type = 'text', placeholder = '', inputmode, min, value = '' } = props;

  const inputmodeAttr = inputmode ? `inputmode="${inputmode}"` : '';
  const minAttr = min ? `min="${min}"` : '';

  return `
    <label class="block">
      ${label ? `<span class="text-sm text-slate-600">${label}</span>` : ''}
      <input
        id="${id}"
        name="${id}"
        type="${type}"
        ${inputmodeAttr}
        ${minAttr}
        value="${escapeHtml(value)}"
        placeholder="${escapeHtml(placeholder)}"
        class="mt-1 h-12 w-full rounded-lg border border-slate-200 bg-white px-3 text-[16px] font-normal leading-[1.5] text-slate-900 placeholder:text-slate-500 outline-none focus:border-2 focus:border-blue-500"

      />
    </label>
  `;
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
