import { Component, OnInit } from '@angular/core';
import { MdDialogRef, MdTabChangeEvent } from '@angular/material';

@Component({
  selector: 'wo-add-imputation-dialog',
  templateUrl: './add-imputation.dialog.html',
  styleUrls: [ './add-imputation.dialog.scss' ]
})
export class AddImputationDialog implements OnInit {
  date: any;
  dateString: string;
  selectedTab: number;

  constructor(
    public dialogRef: MdDialogRef<AddImputationDialog>
  ) {}

  ngOnInit () {
    this.dateString = `${this.capitalizeFirstLetter(this.date.format('dddd'))} ${this.date.format('DD')} ${this.capitalizeFirstLetter(this.date.format('MMMM'))}`;
  }

  onTabChanged ($event: MdTabChangeEvent) {
    this.selectedTab = $event.index;
  }

  capitalizeFirstLetter (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

}
