import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';

import { AppRoute } from './app.route';
import { SharedModule } from './shared/shared.module';
import { WorkCalendarModule } from './work-calendar/work-calendar.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FlexLayoutModule,
    SharedModule.forRoot(),
    WorkCalendarModule,
    AppRoute
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
