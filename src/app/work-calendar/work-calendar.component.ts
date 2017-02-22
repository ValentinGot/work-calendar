import { Component, OnInit, ViewChild } from '@angular/core';
import { MdDialogRef, MdDialog } from '@angular/material';
import { Router } from '@angular/router';
import { CalendarComponent } from 'angular2-fullcalendar/src/calendar/calendar';
import * as moment from 'moment';

import { EventService } from '../shared/event/event.service';
import { EventColors, Event } from '../shared/event/event.model';
import { AddImputationDialog } from './shared/add-imputation/add-imputation.dialog';

@Component({
  selector: 'wo-work-calendar',
  templateUrl: './work-calendar.component.html',
  styleUrls: ['./work-calendar.component.scss']
})
export class WorkCalendarComponent implements OnInit {
  addImputationDialogRef: MdDialogRef<AddImputationDialog>;
  calendarOptions;

  @ViewChild(CalendarComponent) myCalendar: CalendarComponent;

  constructor(
    private dialog: MdDialog,
    private eventService: EventService,
    private router: Router
  ) { }

  ngOnInit() {
    this.calendarOptions = this.getCalendarOptions();

    this.eventService.getAll().subscribe((events) => this.calendarOptions.events = events.map((event) => this.addColor(event)));
  }

  addColor (event: Event) {
    event.color = (moment(event.start).format('A') === 'AM') ? EventColors.AM : EventColors.PM;

    return event;
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

        this.addImputationDialogRef.afterClosed().subscribe((event: Event) => {
          if (event !== undefined) {
            this.myCalendar.fullCalendar('renderEvent', this.addColor(event));
          }
        });
      },
      eventclick    : (event) => {

      },
      events        : []
    };
  }

}
