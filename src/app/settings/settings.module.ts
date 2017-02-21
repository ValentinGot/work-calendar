import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdIconModule } from '@angular/material';

import { SettingsRoutes } from './settings.route';
import { SettingsComponent } from './settings.component';
import { ProjectsComponent } from './projects/projects.component';

@NgModule({
  imports: [
    CommonModule,
    MdIconModule.forRoot(),
    SettingsRoutes
  ],
  declarations: [
    SettingsComponent,
    ProjectsComponent
  ]
})
export class SettingsModule { }
