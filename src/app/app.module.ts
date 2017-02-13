import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';

import { AppRoute } from './app.route';
import { WorkCalendarModule } from './work-calendar/work-calendar.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    WorkCalendarModule,
    FlexLayoutModule,
    AppRoute
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
