import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { ImputationService } from '../../../shared/imputation/imputation.service';
import { Event } from '../../../shared/event/event.model';

@Component({
  selector: 'wo-imputation-detail',
  templateUrl: 'imputation-detail.dialog.html',
  styleUrls: ['imputation-detail.dialog.scss']
})
export class ImputationDetailDialog {
  event: Event;

  constructor(
    public dialogRef: MdDialogRef<ImputationDetailDialog>,
    private imputationService: ImputationService
  ) { }

  onRemove () {
    let eventToRemove: Array<string> = [this.event.imputation._id];

    if (this.event.twinEvent) {
      eventToRemove.push(this.event.twinEvent.imputation._id);
    }

    this.imputationService.remove(eventToRemove).subscribe(() => this.dialogRef.close(this.event));
  }

}
