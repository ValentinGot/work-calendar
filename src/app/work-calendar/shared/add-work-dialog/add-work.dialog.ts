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
  selectedType: number;
  workTypes = [
    { id: 1, value: 'Projet' },
    { id: 2, value: 'Congé' },
    { id: 3, value: 'Arrêt maladie' }
  ];
  selectedProject: number;
  projects = [
    { id: 1, value: '4129 - Croix-Rouge Française - GAIA Lot 2' },
    { id: 2, value: '4036 - Télécom Santé - Patient Ambulatoire' },
    { id: 3, value: '4299 - Oraneg - Module Vitrine' },
    { id: 4, value: '4389 - ARKEA - Générateur' }
  ];

  constructor(
    public dialogRef: MdDialogRef<AddWorkDialog>
  ) {}

  ngOnInit () {
    this.dateString = `${this.capFirst(this.date.format('dddd'))} ${this.date.format('DD')} ${this.capFirst(this.date.format('MMMM'))}`;
    this.selectedType = this.workTypes[0].id;
  }

  capFirst (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

}
