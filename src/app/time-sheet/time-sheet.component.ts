import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { ImputationService } from '../shared/imputation/imputation.service';
import { Imputation, ImputationData, ImputationType } from '../shared/imputation/imputation.model';

@Component({
  selector: 'wo-time-sheet',
  templateUrl: './time-sheet.component.html',
  styleUrls: ['./time-sheet.component.scss']
})
export class TimeSheetComponent implements OnInit {
  dayInMonth: any;
  activities: Array<{
    type: ImputationType,
    data: Object
  }>;

  constructor(private imputationService: ImputationService) { }

  ngOnInit() {
    const month = moment();

    this.dayInMonth = this.calculDayInMonth(month);
    this.getImputation(month);
  }

  calculDayInMonth (month: moment.Moment) {
    const dayInMonth = [],
      baseDate = moment(month).startOf('month');

    for (let i = 0; i <  moment(month).startOf('month').daysInMonth(); i++) {
      baseDate.add(1, 'day');

      if (baseDate.day() > 1) {
        dayInMonth.push({
          dayOfWeek: baseDate.day(),
          dayNumber: i + 1
        });
      }
    }

    return dayInMonth;
  }

  getImputation (month: moment.Moment) {
    this.imputationService.getAllRange(
      moment(month).startOf('month'),
      moment(month).endOf('month')
    ).subscribe((imputations: Array<Imputation>) => {
      this.activities = [];

      while (imputations.length > 0) {
        const activity = {
          type: imputations[0].type,
          data: imputations[0].data,
          am: [],
          pm: []
        };

        this.activities.push(activity);

        imputations = imputations.filter((imputation) => {
          if ((<ImputationData>imputation.data).$key === (<ImputationData>activity.data).$key) {
            if (moment(imputation.start).format('A') === 'AM') {
              activity.am.push(moment(imputation.start).date());
            } else {
              activity.pm.push(moment(imputation.start).date());
            }
          }

          return (<ImputationData>imputation.data).$key !== (<ImputationData>activity.data).$key;
        });
      }
    });
  }

}
