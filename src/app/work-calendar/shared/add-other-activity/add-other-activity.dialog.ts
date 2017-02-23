import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'wo-add-other-activity',
  templateUrl: 'add-other-activity.dialog.html',
  styleUrls: ['add-other-activity.dialog.scss']
})
export class AddOtherActivityDialog implements OnInit {

  constructor(
    public dialogRef: MdDialogRef<AddOtherActivityDialog>
  ) {}

  ngOnInit() {
  }

}
