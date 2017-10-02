import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import * as moment from 'moment';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';

import { ImputationService } from '../shared/imputation/imputation.service';
import { Imputation, ImputationType } from '../shared/imputation/imputation.model';
import { Project } from '../shared/project/project.model';
import { Activity } from '../shared/activity/activity.model';
import { Commercial } from '../shared/commercial/commercial.model';

@Component({
  selector: 'wo-time-sheet',
  templateUrl: './time-sheet.component.html',
  styleUrls: ['./time-sheet.component.scss']
})
export class TimeSheetComponent implements OnInit {
  form: FormGroup;
  months: string[] = moment.months();
  loading: boolean;
  daysInMonth: {
    dayOfWeek: number;
    dayNumber: number;
  }[];

  projects: {
    code: string;
    client: string;
    name: string;
    am: number[];
    pm: number[];
  }[] = [];
  activities: {
    client: string;
    name: string;
    am: number[];
    pm: number[];
  }[] = [];

  constructor (
    private afAuth: AngularFireAuth,
    private router: Router,
    private fb: FormBuilder,
    private imputationService: ImputationService
  ) { }

  ngOnInit () {
    this.form = this.fb.group({
      month: [ moment().format('MMMM'), Validators.required ],
      year: [ moment().format('YYYY'), Validators.required ]
    });

    this.year
      .valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .filter((year) => moment(year).isValid())
      .subscribe(() => this.upgradeTimeSheet());

    this.upgradeTimeSheet();
  }

  onMonthSelected () {
    this.upgradeTimeSheet();
  }

  getImputations (type: ImputationType) {
    const map = new Map();

    return this.imputationService
      .getAllRange(this.selectionToMoment().startOf('month'), this.selectionToMoment().endOf('month'))
      .map((imputations: Imputation[]) => imputations.filter((imputation) => imputation.type === type))
      .map((imputations: Imputation[]) => {
        for (const imputation of imputations) {
          const date = moment(imputation.start);
          let key;

          switch (imputation.type) {
            case ImputationType.PROJECT:
              key = (<Project> imputation.data).code;
              break;

            case ImputationType.ACTIVITY:
              key = (<Activity> imputation.data).name;
              break;

            case ImputationType.COMMERCIAL:
              key = (<Commercial> imputation.data).name;
              break;
          }

          const item = (map.has(key)) ? map.get(key) : {
            ...imputation.data,
            am: [],
            pm: []
          };

          if (date.format('A') === 'AM') {
            item.am.push(date.date());
          } else {
            item.pm.push(date.date());
          }

          map.set(key, item);
        }

        return Array.from(map.values());
      });
  }

  onLogout () {
    this.afAuth.auth.signOut()
      .then(() => this.router.navigate([ '/login' ]));
  }

  get month () { return this.form.controls.month; }
  get year () { return this.form.controls.year; }

  private upgradeTimeSheet () {
    this.loading = true;
    this.daysInMonth = this.getMonthDays();

    this.getImputations(ImputationType.PROJECT)
      .do((projects) => this.projects = projects)
      .mergeMap(() => this.getImputations(ImputationType.ACTIVITY))
      .do((activities) => this.activities = activities)
      .subscribe(() => this.loading = false);
  }

  private getMonthDays () {
    const dayInMonth = [],
      baseDate = this.selectionToMoment().startOf('month');

    for (let i = 0; i <  this.selectionToMoment().startOf('month').daysInMonth(); i++) {
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
    return moment(`${this.year.value}-${this.month.value}`, 'YYYY-MMMM')
  }

}
