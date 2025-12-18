import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'form',
    loadComponent: () => import('./pages/form/form.page').then( m => m.FormPage)
  },
  {
    path: 'detail',
    loadComponent: () => import('./pages/detail/detail.page').then( m => m.DetailPage)
  },
];
