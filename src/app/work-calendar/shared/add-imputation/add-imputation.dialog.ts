import { Component, OnInit, ViewChild } from '@angular/core';
import { MdDialogRef, MdTabChangeEvent } from '@angular/material';
import * as moment from 'moment';

import { AddProjectComponent } from '../add-project/add-project.component';
import { AddOtherActivityComponent } from '../add-other-activity/add-other-activity.component';
import { Event } from '../../../shared/event/event.model';

@Component({
  selector: 'wo-add-imputation-dialog',
  templateUrl: './add-imputation.dialog.html',
  styleUrls: [ './add-imputation.dialog.scss' ]
})
export class AddImputationDialogComponent implements OnInit {
  date: moment.Moment;
  dayEvents: Event[];
  dateString: string;
  selectedTab: number;
  submitEnabled: boolean = true;

  @ViewChild('project') projectComponent: AddProjectComponent;
  @ViewChild('otherActivity') otherActivityComponent: AddOtherActivityComponent;

  constructor(
    public dialogRef: MdDialogRef<AddImputationDialogComponent>
  ) {}

  ngOnInit () {
    const dayName = this.capitalizeFirstLetter(this.date.format('dddd')),
      monthName = this.capitalizeFirstLetter(this.date.format('MMMM'));

    this.dateString = `${dayName} ${this.date.format('DD')} ${monthName}`;
  }

  onTabChanged ($event: MdTabChangeEvent) {
    this.selectedTab = $event.index;
  }

  onSubmit () {
    this.submitEnabled = false;

    switch (this.selectedTab) {
      case 0:
      default:
        this.projectComponent.$onSubmit.emit(true);
        break;

      case 1:
        this.otherActivityComponent.$onSubmit.emit(true);
        break;
    }
  }

  capitalizeFirstLetter (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

}
