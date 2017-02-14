import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { SettingsComponent } from './settings.component';

const settingsRoutes: Routes = [
  {
    path: '',
    component: SettingsComponent
  }
];

export const SettingsRoutes: ModuleWithProviders = RouterModule.forChild(settingsRoutes);
