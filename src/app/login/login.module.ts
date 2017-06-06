import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdIconModule } from '@angular/material';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { LoginComponent } from './login.component';
import { LoginRoute } from './login.route';

@NgModule({
  imports: [
    CommonModule,
    MdIconModule,
    AngularFireAuthModule,
    LoginRoute
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule { }
