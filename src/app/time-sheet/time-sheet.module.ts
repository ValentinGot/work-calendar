import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeSheetRoutes } from './time-sheet.route';
import { TimeSheetComponent } from './time-sheet.component';
import {FormsModule} from "@angular/forms";
import {MdInputModule, MdButtonModule, MdIconModule} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdInputModule,
    MdButtonModule,
    MdIconModule.forRoot(),
    TimeSheetRoutes
  ],
  declarations: [TimeSheetComponent]
})
export class TimeSheetModule { }
