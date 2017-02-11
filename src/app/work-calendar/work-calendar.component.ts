import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wo-work-calendar',
  templateUrl: './work-calendar.component.html',
  styleUrls: ['./work-calendar.component.scss']
})
export class WorkCalendarComponent implements OnInit {
  calendarOptions: Object = {
    // height: 'parent',
    // editable: false, // Don't allow editing of events
    // handleWindowResize: true,
    // weekends: false, // Hide weekends
    // defaultView: 'agendaWeek', // Only show week view
    // header: false, // Hide buttons/titles
    // minTime: '07:30:00', // Start time for the calendar
    // maxTime: '22:00:00', // End time for the calendar
    // columnFormat: {
    //   week: 'ddd' // Only show day of the week names
    // },
    // displayEventTime: true, // Display event time

    height: 'parent',
    fixedWeekCount : false,
    defaultDate: '2016-09-12',
    editable: false,
    eventLimit: true, // allow "more" link when too many events
    events: [
      {
        title: 'All Day Event',
        start: '2016-09-01',
        color: '#C2185B'
      },
      {
        title: 'Long Event',
        start: '2016-09-07',
        end: '2016-09-10',
        color: '#C2185B'
      },
      {
        id: 999,
        title: 'Repeating Event',
        start: '2016-09-09T16:00:00',
        color: '#C2185B'
      },
      {
        id: 999,
        title: 'Repeating Event',
        start: '2016-09-16T16:00:00',
        color: '#C2185B'
      },
      {
        title: 'Conference',
        start: '2016-09-11',
        end: '2016-09-13',
        color: '#C2185B'
      },
      {
        title: 'Meeting',
        start: '2016-09-12T10:30:00',
        end: '2016-09-12T12:30:00',
        color: '#C2185B'
      },
      {
        title: 'Lunch',
        start: '2016-09-12T12:00:00',
        color: '#C2185B'
      },
      {
        title: 'Meeting',
        start: '2016-09-12T14:30:00',
        color: '#C2185B'
      },
      {
        title: 'Happy Hour',
        start: '2016-09-12T17:30:00',
        color: '#C2185B'
      },
      {
        title: 'Dinner',
        start: '2016-09-12T20:00:00',
        color: '#C2185B'
      },
      {
        title: 'Birthday Party',
        start: '2016-09-13T07:00:00',
        color: '#C2185B'
      },
      {
        title: 'Click for Google',
        url: 'http://google.com/',
        start: '2016-09-28',
        color: '#C2185B'
      }
    ]
  };

  constructor() { }

  ngOnInit() {
  }

}
