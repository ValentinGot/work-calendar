import { EventEmitter, Input } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import * as moment from 'moment';

import { DayTime } from '../../../shared/imputation/imputation.model';
import { Event } from '../../../shared/event/event.model';
import { AddImputationDialogComponent } from './add-imputation.dialog';

export class AddImputation {
  @Input() date: moment.Moment;
  @Input() dayEvents: Event[];
  @Input() dialogRef: MdDialogRef<AddImputationDialogComponent>;

  $onSubmit: EventEmitter<boolean>;

  constructor () {
    this.$onSubmit = new EventEmitter<boolean>();
  }

  protected exists (dayTime: DayTime) {
    let exists = false;

    switch (dayTime) {
      case DayTime.AM:
        this.dayEvents.forEach((event) => {
          if (moment(event.start).hours() === 9) {
            exists = true;
          }
        });
        break;

      case DayTime.PM:
        this.dayEvents.forEach((event) => {
          if (moment(event.end).hours() === 18) {
            exists = true;
          }
        });
        break;
    }

    return exists;
  }

}
