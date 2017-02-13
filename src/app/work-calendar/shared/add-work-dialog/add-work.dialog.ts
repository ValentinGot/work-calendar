import { Component, OnInit, Input } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'wo-add-work-dialog',
  templateUrl: './add-work.dialog.html',
  styleUrls: [ './add-work.dialog.scss' ]
})
export class AddWorkDialog implements OnInit {
  date: any;
  dateString: string;
  workTypes =   [
    { id: 1, value: 'Projet' },
    { id: 2, value: 'Congé' },
    { id: 3, value: 'Arrêt maladie' }
  ];
  projects = [
    { id: 1, value: '4129 - Croix-Rouge Française - GAIA Lot 2' },
    { id: 2, value: '4036 - Télécom Santé - Patient Ambulatoire' },
    { id: 3, value: '4299 - Oraneg - Module Vitrine' },
    { id: 4, value: '4389 - ARKEA - Générateur' }
  ];
  selectedType: number;
  selectedProject: number;
  dayTime = {
    am: false,
    pm: false
  };

  constructor(
    public dialogRef: MdDialogRef<AddWorkDialog>
  ) {}

  ngOnInit () {
    this.dateString = `${this.capFirst(this.date.format('dddd'))} ${this.date.format('DD')} ${this.capFirst(this.date.format('MMMM'))}`;
    this.selectedType = this.workTypes[0].id;

    // Pre-select day time depending on the current hour
    if ((new Date()).getHours() <= 12) {
      this.dayTime.am = true;
    } else {
      this.dayTime.pm = true;
    }
  }

  onAdd () {
    console.log('ADD', this.selectedType, this.selectedProject);

    this.dialogRef.close();
  }

  capFirst (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

}
