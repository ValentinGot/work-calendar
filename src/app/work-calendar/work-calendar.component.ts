import { Component, OnInit, ViewChild } from '@angular/core';
import { MdDialogRef, MdDialog } from '@angular/material';
import { CalendarComponent } from 'angular2-fullcalendar/src/calendar/calendar';
import * as moment from 'moment';

import { ImputationService } from '../shared/imputation/imputation.service';
import { Imputation, DayTime } from '../shared/imputation/imputation.model';
import { AddImputationDialog } from './shared/add-imputation/add-imputation.dialog';
import { Event } from '../shared/event/event.model';
import { ImputationDetailDialog } from './shared/imputation-detail/imputation-detail.dialog';
import { SnackbarService } from '../shared/snackbar.service';

@Component({
  selector: 'wo-work-calendar',
  templateUrl: './work-calendar.component.html',
  styleUrls: ['./work-calendar.component.scss']
})
export class WorkCalendarComponent implements OnInit {
  addImputationDialogRef: MdDialogRef<AddImputationDialog>;
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
      timeFormat    : ' ',
      eventRender   : function (event: Event, el) {
        if (!event.twinEvent) {
          el.find('.fc-title').html(`<b>${moment(event.imputation.start).format('A')}</b> ${event.title}`);
        } else {
          el.find('.fc-title').html(event.title);
        }
      },
      dayClick      : (date) => {
        this.addImputationDialogRef = this.dialog.open(AddImputationDialog);
        this.addImputationDialogRef.componentInstance.date = date;

        this.addImputationDialogRef.afterClosed().subscribe((imputations: Imputation[]|undefined) => {
          if (imputations !== undefined) {
            this.myCalendar.fullCalendar('refetchEvents');
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
      eventDrop     : (event: Event, delta) => {
        let dayTime: DayTime = moment(event.imputation.start).format('A') === 'AM' ? DayTime.AM : DayTime.PM;
        let eventsToUpdate: Array<Imputation> = [ event.imputation ];
        event.imputation.start = this.imputationService.getStartTime(event.start, dayTime);
        event.imputation.end = this.imputationService.getEndTime(event.end, dayTime);
        if (event.twinEvent) {
          let twinImputation: Imputation = event.twinEvent.imputation;
          twinImputation.start += delta._days * 86400000;
          twinImputation.end += delta._days * 86400000;
          eventsToUpdate.push(twinImputation);
        }

        this.imputationService.update(eventsToUpdate).subscribe(
          () => this.myCalendar.fullCalendar('refetchEvents'),
          (err) => this.snackBar.error(err));

      },
      events        : (start, end, timezone, cb) => {
        this.imputationService.getAllRange(start, end).subscribe((imputations) => {
          let events = imputations.map((imputation) => this.imputationService.toEvent(imputation));

          cb(this.imputationService.mergeDayEvents(events));
        });
      }
    };
  }

}
