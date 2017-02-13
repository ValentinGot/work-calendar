import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdDialogModule, MdButtonModule } from '@angular/material';
import { CalendarComponent } from 'angular2-fullcalendar/src/calendar/calendar';

import { WorkCalendarRoutes } from './work-calendar.route';
import { WorkCalendarComponent } from './work-calendar.component';
import { AddWorkDialog } from './shared/add-work.dialog';

@NgModule({
  imports: [
    CommonModule,
    MdButtonModule,
    MdDialogModule.forRoot(),
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
