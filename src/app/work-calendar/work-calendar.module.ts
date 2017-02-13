import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MdDialogModule, MdButtonModule, MdRadioModule, MdSelectModule, MdInputModule,
  MdCheckboxModule
} from '@angular/material';
import { CalendarComponent } from 'angular2-fullcalendar/src/calendar/calendar';

import { WorkCalendarRoutes } from './work-calendar.route';
import { WorkCalendarComponent } from './work-calendar.component';
import { AddWorkDialog } from './shared/add-work-dialog/add-work.dialog';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdDialogModule.forRoot(),
    MdButtonModule,
    MdRadioModule.forRoot(),
    MdSelectModule,
    MdInputModule,
    MdCheckboxModule,
    WorkCalendarRoutes
  ],
  declarations: [
    CalendarComponent,
    WorkCalendarComponent,
    AddWorkDialog
  ],
  entryComponents: [
    AddWorkDialog
  ]
})
export class WorkCalendarModule { }
