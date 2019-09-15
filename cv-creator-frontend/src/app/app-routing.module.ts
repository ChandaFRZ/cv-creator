import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'signin',
    loadChildren: () => import('./pages/auth/sign-in/sign-in.module').then(mod => mod.SignInModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/auth/sign-up/sign-up.module').then(mod => mod.SignUpModule)
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/main/main.module').then(mod => mod.MainModule)
  },
  {
    path: 'account',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/account/account.module').then(mod => mod.AccountModule)
  },
  {
    path: 'settings',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/settings/settings.module').then(mod => mod.SettingsModule)
  },
  {
    path: 'module',
    canActivate: [AuthGuard],
    loadChildren: () => import('./cv-components/cv-components.module').then(mod => mod.CvComponentsModule)
  },
  {
    path: 'public',
    loadChildren: () => import('./pages/public/public.module').then(mod => mod.PublicModule)
  },
  {
    path: '**',
    redirectTo: 'home'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
