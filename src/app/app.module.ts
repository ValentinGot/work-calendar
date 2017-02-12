import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { CalendarComponent } from "angular2-fullcalendar/src/calendar/calendar";
import 'hammerjs';

import { AppComponent } from './app.component';
import { WorkCalendarComponent } from './work-calendar/work-calendar.component';
import { AddWorkDialog } from './work-calendar/shared/add-work.dialog';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot()
  ],
  declarations: [
    AppComponent,
    CalendarComponent,
    WorkCalendarComponent,
    AddWorkDialog
  ],
  entryComponents: [
    AddWorkDialog
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
