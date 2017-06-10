import { Component, OnInit, ViewChild } from '@angular/core';
import { MdDialogRef, MdDialog } from '@angular/material';
import * as moment from 'moment';

import { ImputationService } from '../shared/imputation/imputation.service';
import { Imputation, DayTime } from '../shared/imputation/imputation.model';
import { AddImputationDialogComponent } from './shared/add-imputation/add-imputation.dialog';
import { Event } from '../shared/event/event.model';
import { ImputationDetailDialogComponent } from './shared/imputation-detail/imputation-detail.dialog';
import { SnackbarService } from '../shared/snackbar.service';
import { FullCalendarComponent } from './shared/full-calendar/full-calendar.component';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'wo-work-calendar',
  templateUrl: './work-calendar.component.html',
  styleUrls: ['./work-calendar.component.scss']
})
export class WorkCalendarComponent implements OnInit {
  addImputationDialogRef: MdDialogRef<AddImputationDialogComponent>;
  imputationDetailDialogRef: MdDialogRef<ImputationDetailDialogComponent>;
  calendarOptions;
  displayDate: string;
  loading: boolean;

  @ViewChild(FullCalendarComponent) myCalendar: FullCalendarComponent;

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
    const date: any = this.myCalendar.fullCalendar('getDate');

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
      loading: (isLoading: boolean) =>{
        this.loading = isLoading;
      },
      eventRender   : (event: Event, el) => {
        if (!event.twinEvent) {
          el.find('.fc-title').html(`<b>${moment(event.imputation.start).format('A')}</b> ${event.title}`);
        } else {
          el.find('.fc-title').html(event.title);
        }
      },
      dayClick      : (date) => {
        this.addImputationDialogRef = this.dialog.open(AddImputationDialogComponent);
        this.addImputationDialogRef.componentInstance.date = date;

        this.addImputationDialogRef.afterClosed().subscribe((imputations: Imputation[] | undefined) => {
          if (imputations !== undefined) {
            this.myCalendar.fullCalendar('refetchEvents');
          }
        });
      },
      eventClick    : (event: Event) => {
        this.imputationDetailDialogRef = this.dialog.open(ImputationDetailDialogComponent);
        this.imputationDetailDialogRef.componentInstance.event = event;

        this.imputationDetailDialogRef.afterClosed().subscribe((item: Event | undefined) => {
          if (item !== undefined) {
            this.myCalendar.fullCalendar('removeEvents', item.$key);

          }
        });
      },
      eventDrop     : (event: Event, delta) => {
        const dayTime: DayTime = moment(event.imputation.start).format('A') === 'AM' ? DayTime.AM : DayTime.PM;
        const eventsToUpdate: Array<Imputation> = [ event.imputation ];

        event.imputation.start = this.imputationService.getStartTime(event.start, dayTime);
        event.imputation.end = this.imputationService.getEndTime(event.end, dayTime);

        if (event.twinEvent) {
          const twinImputation: Imputation = event.twinEvent.imputation;

          twinImputation.start += delta._days * 86400000;
          twinImputation.end += delta._days * 86400000;
          eventsToUpdate.push(twinImputation);
        }

        this.imputationService.update(eventsToUpdate).subscribe(
          () => this.myCalendar.fullCalendar('refetchEvents'),
          (err) => this.snackBar.error(err));

      },
      events        : (start, end, timezone, cb) => {
        this.imputationService.getAllRange(start, end).toPromise().then((imputations) => {
          const events = imputations.map((imputation) => this.imputationService.toEvent(imputation));

          cb(this.imputationService.mergeDayEvents(events));
        });
      }
    };
  }

}
