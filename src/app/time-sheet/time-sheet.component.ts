import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ImputationService } from '../shared/imputation/imputation.service';
import {Imputation, ImputationData, ImputationType} from "../shared/imputation/imputation.model";

@Component({
  selector: 'wo-time-sheet',
  templateUrl: './time-sheet.component.html',
  styleUrls: ['./time-sheet.component.scss']
})
export class TimeSheetComponent implements OnInit {
  timeSheet: any;
  activities: Array<{
    type: ImputationType,
    data: Object
  }>;
  imputations: Array<Imputation>;

  constructor(private imputationService: ImputationService) { }

  ngOnInit() {
    let month = moment();
    this.timeSheet = {
      dayInMonth : this.dayInMonth(month)
    }
    this.getImputation(month);
  }

  dayInMonth (month: moment.Moment) {
    let dayInMonth = [];
    let baseDate = moment(month).startOf('month');
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
    this.imputationService.getAllRange(moment(month).startOf('month'), moment(month).endOf('month')).subscribe((imputations: Array<Imputation>) => {
      this.imputations = imputations;
      this.activities = [];
      while(imputations.length > 0) {
        let activity = imputations[0].data;
        this.activities.push({
          type: imputations[0].type,
          data: activity
        });
        imputations = imputations.filter((imputation) => (<ImputationData>imputation.data)._id !== (<ImputationData>activity)._id);
      }
      console.log(this.activities);
    });
  }

}
