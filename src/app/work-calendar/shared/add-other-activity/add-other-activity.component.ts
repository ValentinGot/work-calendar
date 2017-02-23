import { Component, OnInit, Input } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { AddImputation } from '../add-imputation/add-imputation.class';
import { AddImputationDialog } from '../add-imputation/add-imputation.dialog';

@Component({
  selector: 'wo-add-other-activity',
  templateUrl: './add-other-activity.component.html',
  styleUrls: ['./add-other-activity.component.scss']
})
export class AddOtherActivityComponent extends AddImputation implements OnInit {
  @Input() date: any;
  @Input() dialogRef: MdDialogRef<AddImputationDialog>;

  constructor(

  ) { super(); }

  ngOnInit() {
  }

}
