import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import(
        './components/parent/parent.component'
      ).then((m) => m.ParentComponent),
  },
  // {
  //   path: 'cpu',
  //   loadComponent: () =>
  //     import(
  //       './components/cpu-system-chart/cpu-system-chart.component'
  //     ).then((m) => m.CpuSystemChartComponent)
  // }, 
  // {
  //   path: 'attentionsbytimeline',
  //   loadComponent: () =>
  //     import(
  //       './components/attentions-by-time-line/attentions-by-time-line.component'
  //     ).then((m) => m.AttentionsByTimeLineComponent)
  // },
  
];
