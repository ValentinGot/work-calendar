import { Component, OnInit } from '@angular/core';
import { MdDialogRef, MdDialog } from '@angular/material';

import { AddWorkDialog } from './shared/add-work-dialog/add-work.dialog';
import { EventService } from '../shared/event/event.service';

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
    dayClick          : (date, jsEvent, view) => {
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
    this.eventService.getAll().subscribe((events) => this.calendarOptions.events = events);
  }

}
