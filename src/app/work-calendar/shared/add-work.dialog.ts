import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'wo-add-work-dialog',
  template: `
    <div class="modal-header">Remplir la journée de travail</div>
    
    <div class="modal-body">
    </div>
    
    <div class="modal-footer">
      <button md-button (click)="dialogRef.close()">Fermer</button>
    </div>
  `
})
export class AddWorkDialog implements OnInit {

  constructor(
    public dialogRef: MdDialogRef<AddWorkDialog>
  ) {}

  ngOnInit () {
  }

}
