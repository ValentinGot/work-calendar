import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { ImputationService } from '../../../shared/imputation/imputation.service';
import { Event } from '../../../shared/event/event.model';

@Component({
  selector: 'wo-imputation-detail',
  templateUrl: 'imputation-detail.dialog.html',
  styleUrls: ['imputation-detail.dialog.scss']
})
export class ImputationDetailDialogComponent {
  event: Event;

  constructor(
    public dialogRef: MdDialogRef<ImputationDetailDialogComponent>,
    private imputationService: ImputationService
  ) { }

  onRemove () {
    const eventToRemove: Array<string> = [this.event.imputation.$key];

    if (this.event.twinEvent) {
      eventToRemove.push(this.event.twinEvent.imputation.$key);
    }

    this.imputationService.remove(eventToRemove).subscribe(() => this.dialogRef.close(this.event));
  }

}
