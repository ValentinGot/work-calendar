import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { SettingsComponent } from './settings.component';
import { ProjectsComponent } from './projects/projects.component';
import { ActivitiesComponent } from './activities/activities.component';

const settingsRoutes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      { path: 'projects', component: ProjectsComponent },
      { path: 'activities', component: ActivitiesComponent }
    ]
  }
];

export const SettingsRoutes: ModuleWithProviders = RouterModule.forChild(settingsRoutes);
