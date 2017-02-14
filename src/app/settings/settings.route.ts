import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { SettingsComponent } from './settings.component';
import { ProjectsComponent } from './projects/projects.component';

const settingsRoutes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      { path: 'projects', component: ProjectsComponent }
    ]
  }
];

export const SettingsRoutes: ModuleWithProviders = RouterModule.forChild(settingsRoutes);
