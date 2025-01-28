import { Routes } from '@angular/router';

export const routes: Routes = [{
    path: '',
    loadComponent: () =>
      import(
        './components/chart-quantity-by-state/chart-quantity-by-state.component'
      ).then((m) => m.ChartQuantityByStateComponent),
  },];
