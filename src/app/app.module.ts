import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import 'hammerjs';

import { AppRoute } from './app.route';
import { WorkCalendarModule } from './work-calendar/work-calendar.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    WorkCalendarModule,
    AppRoute
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
