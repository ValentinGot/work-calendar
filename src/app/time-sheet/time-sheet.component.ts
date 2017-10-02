import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import * as moment from 'moment';

import { ImputationService } from '../shared/imputation/imputation.service';
import { Imputation, ImputationType } from '../shared/imputation/imputation.model';
import { Project } from '../shared/project/project.model';

@Component({
  selector: 'wo-time-sheet',
  templateUrl: './time-sheet.component.html',
  styleUrls: ['./time-sheet.component.scss']
})
export class TimeSheetComponent implements OnInit {
  months: string[] = moment.months();
  form: FormGroup;
  selectedMonth: string = moment().format('MMMM');
  selectedYear: string = moment().format('YYYY');
  dayInMonth: any;
  projects: {
    code: string;
    client: string;
    name: string;
    am: number[];
    pm: number[];
  }[] = [];

  constructor (
    private afAuth: AngularFireAuth,
    private router: Router,
    private imputationService: ImputationService
  ) { }

  ngOnInit () {
    this.onMonthSelected();
  }

  onMonthSelected () {
    this.dayInMonth = this.getMonthDays();
    this.getProjects();
  }

  onYearChanged () {
    this.getProjects();
  }

  getProjects () {
    const mapProjects = new Map<string, {
      code: string;
      client: string;
      name: string;
      am: number[];
      pm: number[];
    }>();

    this.imputationService.getAllRange(
      moment(this.selectedMonth, 'MMMM').startOf('month'),
      moment(this.selectedMonth, 'MMMM').endOf('month'),
      ImputationType.PROJECT
    ).subscribe((imputations: Imputation[]) => {
      for (const imputation of imputations) {
        const date = moment(imputation.start);
        const item = (mapProjects.has((<Project> imputation.data).code)) ? mapProjects.get((<Project> imputation.data).code) : {
          code: (<Project> imputation.data).code,
          client: (<Project> imputation.data).client,
          name: (<Project> imputation.data).name,
          am: [],
          pm: []
        };

        if (date.format('A') === 'AM') {
          item.am.push(date.date());
        } else {
          item.pm.push(date.date());
        }

        mapProjects.set((<Project> imputation.data).code, item);
      }

      this.projects = Array.from(mapProjects.values());
    });
  }

  onLogout () {
    this.afAuth.auth.signOut()
      .then(() => this.router.navigate([ '/login' ]));
  }

  /**
   * Retrieve all month days
   *
   * @returns {Array}
   */
  private getMonthDays () {
    const dayInMonth = [],
      baseDate = moment(this.selectedMonth, 'MMMM').startOf('month');

    for (let i = 0; i <  moment(this.selectedMonth, 'MMMM').startOf('month').daysInMonth(); i++) {
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

  private selectionToMoment () {
    return moment(`${this.selectedYear}-${this.selectedMonth}`, 'YYYY-MMMM')
  }

}
