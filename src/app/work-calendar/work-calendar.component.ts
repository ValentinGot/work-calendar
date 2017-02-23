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
      imputation: imputation,
      className : ''
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

  private mergeDayEvents (events: Array<Event>) {
    events.forEach((event: Event) => {
      let findEvent = events.find((eventf: Event) => {
        return moment(event.start).format('ddd, ll') === moment(eventf.start).format('ddd, ll') &&
          event.imputation.project._id === eventf.imputation.project._id &&
          event.imputation._id !== eventf.imputation._id;
      });
      if (findEvent) {
        if (moment(event.imputation.start).format('A') === 'AM') {
          findEvent.start = event.start;
        } else {
          findEvent.end = event.end;
        }
        findEvent.twinEvent = event;
        findEvent.className = 'full-day';
        events.splice(events.indexOf(event), 1);
      }
    });
    return events;
  }

  private getCalendarOptions () {
    return {
      locale        : 'fr',
      height        : 'parent',
      fixedWeekCount: false,
      editable      : true,
      timeFormat    : ' ',
      eventRender: function(event: Event, el) {
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
        let dayTime: DayTime = moment(event.imputation.start).format('A') === 'AM' ? DayTime.AM: DayTime.PM;
        let eventsToUpdate: Array<Imputation> = [event.imputation];
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
        this.imputationService.getAllRange(start, end).subscribe((imputations) => cb(this.mergeDayEvents(imputations.map((imputation) => this.toEvent(imputation)))));
      }
    };
  }

}
