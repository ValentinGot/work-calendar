import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MdDialogRef, MdDialog } from '@angular/material';
import { Router } from '@angular/router';
import { CalendarComponent } from 'angular2-fullcalendar/src/calendar/calendar';
import * as moment from 'moment';

import { ImputationService } from '../shared/imputation/imputation.service';
import { ImputationColors, Imputation, DayTime } from '../shared/imputation/imputation.model';
import { AddImputationDialog } from './shared/add-imputation/add-imputation.dialog';
import { Event } from '../shared/event/event.model';
import { ImputationDetailDialog } from './shared/imputation-detail/imputation-detail.dialog';
import { AddOtherActivityDialog } from './shared/add-other-activity/add-other-activity.dialog';
import { SnackbarService } from '../shared/snackbar.service';

@Component({
  selector: 'wo-work-calendar',
  templateUrl: './work-calendar.component.html',
  styleUrls: ['./work-calendar.component.scss']
})
export class WorkCalendarComponent implements OnInit {
  addImputationDialogRef: MdDialogRef<AddImputationDialog>;
  addOtherActivityDialogRef: MdDialogRef<AddOtherActivityDialog>;
  imputationDetailDialogRef: MdDialogRef<ImputationDetailDialog>;
  calendarOptions;
  displayDate: string;

  @ViewChild(CalendarComponent) myCalendar: CalendarComponent;

  constructor(
    private dialog: MdDialog,
    private imputationService: ImputationService,
    private snackBar: SnackbarService
  ) { }

  ngOnInit() {
    this.calendarOptions = this.getCalendarOptions();

    this.displayDate = this.getDisplayDate(moment());
  }

  toEvent (imputation: Imputation): Event {
    return {
      title     : `${imputation.project.code} - ${imputation.project.name}`,
      start     : moment(imputation.start),
      end       : moment(imputation.end),
      color     : (moment(imputation.start).format('A') === 'AM') ? ImputationColors.AM : ImputationColors.PM,
      imputation: imputation
    };
  }

  onToday () {
    this.myCalendar.fullCalendar('today');

    this.updateDisplayDate();
  }

  onPrevious () {
    this.myCalendar.fullCalendar('prev');

    this.updateDisplayDate();
  }

  onNext () {
    this.myCalendar.fullCalendar('next');

    this.updateDisplayDate();
  }

  onOtherActivity () {
    this.addOtherActivityDialogRef = this.dialog.open(AddOtherActivityDialog);

    this.addOtherActivityDialogRef.afterClosed().subscribe(() => {
      // TODO Add imputation to calendar
    });
  }

  private updateDisplayDate () {
    let date: any = this.myCalendar.fullCalendar('getDate');

    this.displayDate = this.getDisplayDate(date as moment.Moment);
  }

  private getDisplayDate (date: moment.Moment): string {
    return date.format('MMMM YYYY');
  }

  private getCalendarOptions () {
    return {
      locale        : 'fr',
      height        : 'parent',
      fixedWeekCount: false,
      editable      : true,
      timeFormat    : 'A',
      dayClick      : (date) => {
        this.addImputationDialogRef = this.dialog.open(AddImputationDialog);
        this.addImputationDialogRef.componentInstance.date = date;

        this.addImputationDialogRef.afterClosed().subscribe((imputations: Imputation[]|undefined) => {
          if (imputations !== undefined) {
            this.myCalendar.fullCalendar('renderEvents', imputations.map((imputation) => this.toEvent(imputation)));
          }
        });
      },
      eventClick    : (event: Event) => {
        this.imputationDetailDialogRef = this.dialog.open(ImputationDetailDialog);
        this.imputationDetailDialogRef.componentInstance.event = event;

        this.imputationDetailDialogRef.afterClosed().subscribe((event: Event|undefined) => {
          if (event !== undefined) {
            this.myCalendar.fullCalendar('removeEvents', event._id);
          }
        });
      },
      eventDrop     : (event: Event) => {
        let dayTime: DayTime = moment(event.imputation.start).format('A') === 'AM' ? DayTime.AM: DayTime.PM;
        event.imputation.start = this.imputationService.getStartTime(event.start, dayTime);
        event.imputation.end = this.imputationService.getEndTime(event.end, dayTime);
        this.imputationService.update(event.imputation._id, event.imputation).subscribe(
          () => {},
          (err) => this.snackBar.error(err));
      },
      events        : (start, end, timezone, cb) => this.imputationService.getAll().subscribe((imputations) => cb(imputations.map((imputation) => this.toEvent(imputation))))
    };
  }

}
