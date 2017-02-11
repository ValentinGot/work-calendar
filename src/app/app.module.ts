import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { CalendarComponent } from "angular2-fullcalendar/src/calendar/calendar";
import { WorkCalendarComponent } from './work-calendar/work-calendar.component';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    WorkCalendarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
