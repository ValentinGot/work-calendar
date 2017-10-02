import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MdIconModule, MdSnackBarModule } from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { AppRoute } from './app.route';
import { SharedModule } from './shared/shared.module';
import { AuthGuard } from './shared/auth.guard';
import { environment } from '../environments/environment';
import { AuthenticatedGuard } from './shared/authenticated.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RouterModule,
    SharedModule,
    MdIconModule,
    MdSnackBarModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppRoute
  ],
  providers: [
    AuthGuard,
    AuthenticatedGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
