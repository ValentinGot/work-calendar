import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdInputModule, MdButtonModule, MdIconModule } from '@angular/material';

import { TimeSheetRoutes } from './time-sheet.route';
import { TimeSheetComponent } from './time-sheet.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdInputModule,
    MdButtonModule,
    MdIconModule,
    TimeSheetRoutes
  ],
  declarations: [TimeSheetComponent]
})
export class TimeSheetModule { }
