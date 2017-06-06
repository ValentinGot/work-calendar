import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import { Options } from 'fullcalendar';
import * as $ from 'jquery';
import 'fullcalendar';

@Component({
  selector: 'wo-full-calendar',
  template: '<div></div>'
})
export class FullCalendarComponent implements AfterViewInit {
  @Input() options: Options;

  constructor (
    private element: ElementRef
  ) {}

  ngAfterViewInit () {
    setTimeout(() => {
      $('wo-full-calendar').fullCalendar(this.options);
    }, 100);
  }

  fullCalendar (...args: any[]) {
    if (!args) {
      return;
    }

    switch (args.length) {
      case 0:
        return;

      case 1:
        return $(this.element.nativeElement).fullCalendar(args[ 0 ]);

      case 2:
        return $(this.element.nativeElement).fullCalendar(args[ 0 ], args[ 1 ]);

      case 3:
        return $(this.element.nativeElement).fullCalendar(args[ 0 ], args[ 1 ], args[ 2 ]);
    }
  }

}
