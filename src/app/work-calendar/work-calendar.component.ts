import { Component, OnInit, ViewChild } from '@angular/core';
import { MdDialogRef, MdDialog } from '@angular/material';
import { CalendarComponent } from 'angular2-fullcalendar/src/calendar/calendar';
import * as moment from 'moment';

import { AddWorkDialog } from './shared/add-work-dialog/add-work.dialog';
import { EventService } from '../shared/event/event.service';
import { EventColors, Event } from '../shared/event/event.model';
import { Router } from '@angular/router';

@Component({
  selector: 'wo-work-calendar',
  templateUrl: './work-calendar.component.html',
  styleUrls: ['./work-calendar.component.scss']
})
export class WorkCalendarComponent implements OnInit {
  addWorkDialogRef: MdDialogRef<AddWorkDialog>;
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
          click: () => this.router.navigate([ '/settings' ])
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
        this.addWorkDialogRef = this.dialog.open(AddWorkDialog);
        this.addWorkDialogRef.componentInstance.date = date;

        this.addWorkDialogRef.afterClosed().subscribe((event: Event) => {
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
