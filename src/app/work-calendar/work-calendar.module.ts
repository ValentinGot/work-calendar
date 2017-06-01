import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MdDialogModule, MdButtonModule, MdRadioModule, MdSelectModule, MdInputModule,
  MdCheckboxModule, MdTabsModule, MdIconModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CalendarComponent } from 'angular2-fullcalendar/src/calendar/calendar';

import { WorkCalendarRoutes } from './work-calendar.route';
import { WorkCalendarComponent } from './work-calendar.component';
import { AddImputationDialogComponent } from './shared/add-imputation/add-imputation.dialog';
import { AddProjectComponent } from './shared/add-project/add-project.component';
import { ImputationDetailDialogComponent } from './shared/imputation-detail/imputation-detail.dialog';
import { AddOtherActivityComponent } from './shared/add-other-activity/add-other-activity.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdDialogModule,
    MdButtonModule,
    MdRadioModule,
    MdSelectModule,
    MdInputModule,
    MdIconModule,
    MdCheckboxModule,
    MdTabsModule,
    FlexLayoutModule,
    WorkCalendarRoutes
  ],
  declarations: [
    CalendarComponent,
    WorkCalendarComponent,
    AddImputationDialogComponent,
    AddProjectComponent,
    ImputationDetailDialogComponent,
    AddOtherActivityComponent
  ],
  entryComponents: [
    AddImputationDialogComponent,
    ImputationDetailDialogComponent
  ]
})
export class WorkCalendarModule { }
