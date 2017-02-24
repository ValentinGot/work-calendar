import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'wo-time-sheet',
  templateUrl: './time-sheet.component.html',
  styleUrls: ['./time-sheet.component.scss']
})
export class TimeSheetComponent implements OnInit {
  timeSheet: any;

  constructor() { }

  ngOnInit() {
    this.timeSheet = {
      dayInMonth : this.dayInMonth()
    }
  }

  dayInMonth () {
    let dayInMonth = [];
    let baseDate = moment("2017-02", "YYYY-MM");
    for (let i = 0; i < moment("2017-02", "YYYY-MM").daysInMonth(); i++) {
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

}
