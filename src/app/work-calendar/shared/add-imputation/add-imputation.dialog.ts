import { Component, OnInit, ViewChild } from '@angular/core';
import { MdDialogRef, MdTabChangeEvent } from '@angular/material';

import { AddProjectComponent } from '../add-project/add-project.component';
import { AddOtherActivityComponent } from '../add-other-activity/add-other-activity.component';

@Component({
  selector: 'wo-add-imputation-dialog',
  templateUrl: './add-imputation.dialog.html',
  styleUrls: [ './add-imputation.dialog.scss' ]
})
export class AddImputationDialog implements OnInit {
  date: any;
  dateString: string;
  selectedTab: number;

  @ViewChild('project') projectComponent: AddProjectComponent;
  @ViewChild('otherActivity') otherActivityComponent: AddOtherActivityComponent;

  constructor(
    public dialogRef: MdDialogRef<AddImputationDialog>
  ) {}

  ngOnInit () {
    this.dateString = `${this.capitalizeFirstLetter(this.date.format('dddd'))} ${this.date.format('DD')} ${this.capitalizeFirstLetter(this.date.format('MMMM'))}`;
  }

  onTabChanged ($event: MdTabChangeEvent) {
    this.selectedTab = $event.index;
  }

  onSubmit () {
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
