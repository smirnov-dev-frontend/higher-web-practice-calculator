import { renderHistoryPage } from './pages/history-page';
import { renderMainPage } from './pages/main-page';
import { renderStartPage } from './pages/start-page';
import { getAllTransactions, getBudget } from './utils/db';
import { appStore, type Route } from './utils/state';

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

export async function initApp(): Promise<void> {
  const root = document.getElementById('app');
  if (!root) {
    throw new Error('Root element #app not found in index.html');
  }

  appStore.setState({ loading: true, error: null });

  try {
    const [budget, transactions] = await Promise.all([getBudget(), getAllTransactions()]);

    appStore.setState({
      budget: budget ?? null,
      transactions,
      route: budget ? 'main' : 'start',
      loading: false,
    });
  } catch (e) {
    appStore.setState({
      loading: false,
      error: e instanceof Error ? e.message : 'Unknown error',
      route: 'start',
    });
  }

  appStore.subscribe(state => {
    renderRoute(state.route, root);
  });

  renderRoute(appStore.getState().route, root);
}
