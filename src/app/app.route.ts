import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

const appRoutes: Routes = [
  { path: 'settings', loadChildren: 'app/settings/settings.module#SettingsModule' },
  { path: 'time-sheet', loadChildren: 'app/time-sheet/time-sheet.module#TimeSheetModule' },
  { path: '', loadChildren: 'app/work-calendar/work-calendar.module#WorkCalendarModule' }
];

export const AppRoute: ModuleWithProviders = RouterModule.forRoot(appRoutes, {
  preloadingStrategy: PreloadAllModules
});
