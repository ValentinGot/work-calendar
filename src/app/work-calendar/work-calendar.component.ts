import { Component, OnInit, ViewChild } from '@angular/core';
import { MdDialogRef, MdDialog } from '@angular/material';
import { Router } from '@angular/router';
import { CalendarComponent } from 'angular2-fullcalendar/src/calendar/calendar';
import * as moment from 'moment';

import { ImputationService } from '../shared/imputation/imputation.service';
import { ImputationColors, Imputation } from '../shared/imputation/imputation.model';
import { AddImputationDialog } from './shared/add-imputation/add-imputation.dialog';
import { Event } from '../shared/event/event.model';
import { ImputationDetailDialog } from './shared/imputation-detail/imputation-detail.dialog';

@Component({
  selector: 'wo-work-calendar',
  templateUrl: './work-calendar.component.html',
  styleUrls: ['./work-calendar.component.scss']
})
export class WorkCalendarComponent implements OnInit {
  addImputationDialogRef: MdDialogRef<AddImputationDialog>;
  imputationDetailDialogRef: MdDialogRef<ImputationDetailDialog>;
  calendarOptions;

  @ViewChild(CalendarComponent) myCalendar: CalendarComponent;

  constructor(
    private dialog: MdDialog,
    private imputationService: ImputationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.calendarOptions = this.getCalendarOptions();
  }

  toEvent (imputation: Imputation): Event {
    return {
      title     : `${imputation.project.code} - ${imputation.project.name}`,
      start     : imputation.start,
      end       : imputation.end,
      color     : (moment(imputation.start).format('A') === 'AM') ? ImputationColors.AM : ImputationColors.PM,
      imputation: imputation
    };
  }

  getCalendarOptions () {
    return {
      locale        : 'fr',
      height        : 'parent',
      fixedWeekCount: false,
      editable      : false,
      timeFormat    : 'A',
      customButtons : {
        settings: {
          text : 'Param.',
          click: () => this.router.navigate([ '/settings/projects' ])
        }
      },
      header        : {
        center: 'today,prev,next',
        right : 'settings'
      },
      buttonIcons   : {
        prev: '',
        next: ''
      },
      buttonText    : {
        today: 'Auj.',
        prev : 'Prev.',
        next : 'Suiv.'
      },
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
      events        : (start, end, timezone, cb) => this.imputationService.getAll().subscribe((imputations) => cb(imputations.map((imputation) => this.toEvent(imputation))))
    };
  }

}
