import type { Budget, Transaction } from '../models/schemas';

export type Route = 'start' | 'main' | 'history';

export interface AppState {
  route: Route;
  budget: Budget | null;
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

type Listener<T> = (state: Readonly<T>) => void;

function shallowEqual<T extends object>(a: T, b: T): boolean {
  if (Object.is(a, b)) {
    return true;
  }

  const aKeys = Object.keys(a) as Array<keyof T>;
  const bKeys = Object.keys(b) as Array<keyof T>;

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  for (const key of aKeys) {
    if (!Object.prototype.hasOwnProperty.call(b, key)) {
      return false;
    }
    if (!Object.is(a[key], b[key])) {
      return false;
    }
  }

  return true;
}

export function createStore<T extends object>(initialState: T) {
  let state = initialState;
  const listeners = new Set<Listener<T>>();

  const getState = (): Readonly<T> => state;

  const setState = (partial: Partial<T> | ((prev: Readonly<T>) => Partial<T>)) => {
    const patch = typeof partial === 'function' ? partial(state) : partial;
    const nextState = { ...state, ...patch } as T;

    if (shallowEqual(state, nextState)) {
      return;
    }

    state = nextState;
    listeners.forEach(listener => listener(state));
  };

  const subscribe = (listener: Listener<T>) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };

  return { getState, setState, subscribe };
}

export const appStore = createStore<AppState>({
  route: 'start',
  budget: null,
  transactions: [],
  loading: false,
  error: null,
});
