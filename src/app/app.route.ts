import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { AuthGuard } from './shared/auth.guard';
import { AuthenticatedGuard } from './shared/authenticated.guard';

const appRoutes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/login/login.module#LoginModule',
    canLoad: [ AuthenticatedGuard ]
  },
  {
    path: 'settings',
    loadChildren: 'app/settings/settings.module#SettingsModule',
    canLoad: [ AuthGuard ]
  },
  {
    path: 'time-sheet',
    loadChildren: 'app/time-sheet/time-sheet.module#TimeSheetModule',
    canLoad: [ AuthGuard ]
  },
  {
    path: 'work-calendar',
    loadChildren: 'app/work-calendar/work-calendar.module#WorkCalendarModule',
    canLoad: [ AuthGuard ]
  },
  {
    path: '',
    redirectTo: '/work-calendar',
    pathMatch: 'full'
  }
];

export const AppRoute: ModuleWithProviders = RouterModule.forRoot(appRoutes, {
  preloadingStrategy: PreloadAllModules
});
