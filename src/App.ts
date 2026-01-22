import { renderHistoryPage } from './pages/history-page';
import { renderMainPage } from './pages/main-page';
import { renderStartPage } from './pages/start-page';
import { getAllTransactions, getBudget } from './utils/db';
import { appStore, type Route } from './utils/state';

let isInitialized = false;
let unsubscribe: null | (() => void) = null;

function renderRoute(route: Route, root: HTMLElement) {
  root.innerHTML = '';

  if (route === 'start') {
    root.append(renderStartPage());
    return;
  }

  if (route === 'main') {
    root.append(renderMainPage());
    return;
  }

  root.append(renderHistoryPage());
}

function renderApp(root: HTMLElement) {
  const state = appStore.getState();

  renderRoute(state.route, root);
}

export async function initApp(force = false): Promise<void> {
  const root = document.getElementById('app');
  if (!root) {
    throw new Error('Root element #app not found in index.html');
  }

  if (isInitialized && !force) {
    renderApp(root);
    return;
  }
  isInitialized = true;

  if (!unsubscribe) {
    unsubscribe = appStore.subscribe(() => {
      renderApp(root);
    });
  }

  appStore.setState({ loading: true, error: null });

  try {
    const [budget, transactions] = await Promise.all([getBudget(), getAllTransactions()]);

    appStore.setState({
      budget: budget ?? null,
      transactions,
      route: budget ? 'main' : 'start',
      loading: false,
      error: null,
    });
  } catch (e) {
    appStore.setState({
      loading: false,
      error: e instanceof Error ? e.message : 'Unknown error',
      route: 'start',
    });
  }

  renderApp(root);
}
