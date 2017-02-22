import { Component, OnInit, ViewChild } from '@angular/core';
import { MdDialogRef, MdTabChangeEvent } from '@angular/material';
import { AddQuickImputationComponent } from '../add-quick-imputation/add-quick-imputation.component';

@Component({
  selector: 'wo-add-imputation-dialog',
  templateUrl: './add-imputation.dialog.html',
  styleUrls: [ './add-imputation.dialog.scss' ]
})
export class AddImputationDialog implements OnInit {
  date: any;
  dateString: string;
  selectedTab: number;

  @ViewChild('quickImputation') quickImputationComponent: AddQuickImputationComponent;

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
        this.quickImputationComponent.$onSubmit.emit(true);
        break;

      case 1:
        break;
    }
  }

  capitalizeFirstLetter (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

}
