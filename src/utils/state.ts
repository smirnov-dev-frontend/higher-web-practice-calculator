import type { Budget, Transaction } from '../models/schemas';

export type Route = 'start' | 'main' | 'history';

export interface AppState {
  route: Route;
  budget: Budget | null;
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

type Listener<T> = (state: T) => void;

export function createStore<T extends object>(initialState: T) {
  let state = initialState;
  const listeners = new Set<Listener<T>>();

  const getState = () => state;

  const setState = (partial: Partial<T> | ((prev: T) => Partial<T>)) => {
    const patch = typeof partial === 'function' ? partial(state) : partial;
    state = { ...state, ...patch };
    listeners.forEach(listener => {
      listener(state);
    });
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
