import { format } from 'date-fns';

export function formatISODate(d: Date): string {
  return format(d, 'yyyy-MM-dd');
}
