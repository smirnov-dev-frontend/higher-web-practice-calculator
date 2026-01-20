import { InputField } from './input';

export function DateInput(props: { id: string; label?: string; value?: string; min?: string }) {
  return InputField({
    id: props.id,
    label: props.label,
    type: 'date',
    value: props.value ?? '',
    min: props.min,
  });
}
