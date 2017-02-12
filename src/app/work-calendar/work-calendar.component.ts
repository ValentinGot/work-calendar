import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wo-work-calendar',
  templateUrl: './work-calendar.component.html',
  styleUrls: ['./work-calendar.component.scss']
})
export class WorkCalendarComponent implements OnInit {
  calendarOptions: Object = {
    locale: 'fr',
    height: 'parent',
    fixedWeekCount : false,
    // defaultDate: '2016-09-12',
    editable: false,
    eventLimit: true, // allow "more" link when too many events
    handleWindowResize: true,
    dayClick: (date, jsEvent, view) => {
      console.log(date);
    },
    events: [
      {
        title: 'All Day Event',
        start: '2016-09-01',
        color: '#029AE4'
      },
      {
        title: 'Long Event',
        start: '2016-09-07',
        end: '2016-09-10',
        color: '#029AE4'
      },
      {
        id: 999,
        title: 'Repeating Event',
        start: '2016-09-09T16:00:00',
        color: '#029AE4'
      },
      {
        id: 999,
        title: 'Repeating Event',
        start: '2016-09-16T16:00:00',
        color: '#029AE4'
      },
      {
        title: 'Conference',
        start: '2016-09-11',
        end: '2016-09-13',
        color: '#029AE4'
      },
      {
        title: 'Meeting',
        start: '2016-09-12T10:30:00',
        end: '2016-09-12T12:30:00',
        color: '#029AE4'
      },
      {
        title: 'Lunch',
        start: '2016-09-12T12:00:00',
        color: '#029AE4'
      },
      {
        title: 'Meeting',
        start: '2016-09-12T14:30:00',
        color: '#029AE4'
      },
      {
        title: 'Happy Hour',
        start: '2016-09-12T17:30:00',
        color: '#029AE4'
      },
      {
        title: 'Dinner',
        start: '2016-09-12T20:00:00',
        color: '#029AE4'
      },
      {
        title: 'Birthday Party',
        start: '2016-09-13T07:00:00',
        color: '#029AE4'
      },
      {
        title: 'Click for Google',
        url: 'http://google.com/',
        start: '2016-09-28',
        color: '#029AE4'
      }
    ]
  };

  constructor() { }

  ngOnInit() {
  }

}
