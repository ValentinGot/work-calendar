import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MdInputModule, MdButtonModule, MdIconModule, MdMenuModule, MdSelectModule,
  MdProgressSpinnerModule
} from '@angular/material';

import { TimeSheetRoutes } from './time-sheet.route';
import { TimeSheetComponent } from './time-sheet.component';
import { LayoutModule } from '../layout/layout.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdInputModule,
    MdButtonModule,
    MdIconModule,
    MdMenuModule,
    MdSelectModule,
    MdProgressSpinnerModule,
    LayoutModule,
    TimeSheetRoutes
  ],
  declarations: [
    TimeSheetComponent
  ]
})
export class TimeSheetModule { }
