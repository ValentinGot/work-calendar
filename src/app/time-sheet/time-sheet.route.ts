import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { TimeSheetComponent } from './time-sheet.component';

const timeSheetRoute: Routes = [
  { path: '', component: TimeSheetComponent }
];

export const TimeSheetRoutes: ModuleWithProviders = RouterModule.forChild(timeSheetRoute);
