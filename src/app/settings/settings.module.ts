import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdIconModule, MdInputModule, MdButtonModule } from '@angular/material';

import { SettingsRoutes } from './settings.route';
import { SettingsComponent } from './settings.component';
import { ProjectsComponent } from './projects/projects.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdInputModule,
    MdButtonModule,
    MdIconModule.forRoot(),
    SettingsRoutes
  ],
  declarations: [
    SettingsComponent,
    ProjectsComponent
  ]
})
export class SettingsModule { }
