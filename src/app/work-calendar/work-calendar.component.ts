import { Component, OnInit } from '@angular/core';
import { MdDialogRef, MdDialog } from '@angular/material';
import * as moment from 'moment';

import { AddWorkDialog } from './shared/add-work-dialog/add-work.dialog';
import { EventService } from '../shared/event/event.service';
import { EventColors } from '../shared/event/event.model';

@Component({
  selector: 'wo-work-calendar',
  templateUrl: './work-calendar.component.html',
  styleUrls: ['./work-calendar.component.scss']
})
export class WorkCalendarComponent implements OnInit {
  addWorkDialogRef: MdDialogRef<AddWorkDialog>;

  calendarOptions = {
    locale            : 'fr',
    height            : 'parent',
    fixedWeekCount    : false,
    editable          : false,
    eventLimit        : true, // TODO Remove
    handleWindowResize: true,
    timeFormat        : 'A',
    dayClick          : (date) => {
      this.addWorkDialogRef = this.dialog.open(AddWorkDialog);
      this.addWorkDialogRef.componentInstance.date = date;
    },
    events            : []
  };

  constructor(
    private dialog: MdDialog,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.eventService.getAll().subscribe((events) => this.calendarOptions.events = events.map((event) => {
      event.color = (moment(event.start).format('A') === 'AM') ? EventColors.AM : EventColors.PM;

      return event;
    }));
  }

}
