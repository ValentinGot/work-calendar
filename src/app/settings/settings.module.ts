import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MdIconModule, MdInputModule, MdButtonModule, MdProgressSpinnerModule,
  MdTooltipModule
} from '@angular/material';

import { SettingsRoutes } from './settings.route';
import { SettingsComponent } from './settings.component';
import { ProjectsComponent } from './projects/projects.component';
import { ActivitiesComponent } from './activities/activities.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdInputModule,
    MdButtonModule,
    MdIconModule.forRoot(),
    MdProgressSpinnerModule,
    MdTooltipModule,
    SettingsRoutes
  ],
  declarations: [
    SettingsComponent,
    ProjectsComponent,
    ActivitiesComponent
  ]
})
export class SettingsModule { }
