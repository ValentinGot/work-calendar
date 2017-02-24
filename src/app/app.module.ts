import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import 'hammerjs';

import { AppRoute } from './app.route';
import { SharedModule } from './shared/shared.module';
import { WorkCalendarModule } from './work-calendar/work-calendar.module';
import { SettingsModule } from './settings/settings.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    SharedModule.forRoot(),
    WorkCalendarModule,
    SettingsModule,
    AppRoute
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
