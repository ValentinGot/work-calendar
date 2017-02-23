import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { Imputation } from '../../../shared/imputation/imputation.model';

@Component({
  selector: 'wo-imputation-detail',
  templateUrl: 'imputation-detail.dialog.html',
  styleUrls: ['imputation-detail.dialog.scss']
})
export class ImputationDetailDialog {
  imputation: Imputation;

  constructor(
    public dialogRef: MdDialogRef<ImputationDetailDialog>
  ) { }

}
