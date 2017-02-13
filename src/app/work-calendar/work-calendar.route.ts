import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { WorkCalendarComponent } from './work-calendar.component';

const workCalendarRoutes: Routes = [
  { path: '', component: WorkCalendarComponent }
];

export const WorkCalendarRoutes: ModuleWithProviders = RouterModule.forChild(workCalendarRoutes);
