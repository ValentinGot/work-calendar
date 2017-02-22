import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MdDialogModule, MdButtonModule, MdRadioModule, MdSelectModule, MdInputModule,
  MdCheckboxModule, MdTabsModule
} from '@angular/material';
import { CalendarComponent } from 'angular2-fullcalendar/src/calendar/calendar';

import { WorkCalendarRoutes } from './work-calendar.route';
import { WorkCalendarComponent } from './work-calendar.component';
import { AddWorkDialog } from './shared/add-work-dialog/add-work.dialog';
import { AddImputationDialog } from './shared/add-imputation/add-imputation.dialog';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdDialogModule.forRoot(),
    MdButtonModule,
    MdRadioModule.forRoot(),
    MdSelectModule,
    MdInputModule,
    MdCheckboxModule,
    MdTabsModule,
    WorkCalendarRoutes
  ],
  declarations: [
    CalendarComponent,
    WorkCalendarComponent,
    AddWorkDialog,
    AddImputationDialog,
  ],
  entryComponents: [
    AddWorkDialog,
    AddImputationDialog
  ]
})
export class WorkCalendarModule { }
