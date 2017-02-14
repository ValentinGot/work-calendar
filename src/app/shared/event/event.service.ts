import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

import { HttpResponseHandler } from '../http-response-handler';
import { environment } from '../../../environments/environment';
import { Event } from './event.model';

enum EVENT_DAY_TIME { AM, PM }

@Injectable()
export class EventService extends HttpResponseHandler {
  private baseUrl: string = '/events';
  private url: string;

  constructor (
    private http: Http
  ) {
    super();

    this.url = `${environment.url}${this.baseUrl}`;
  }

  public getAll (): Observable<Event[]> {
    return this.http.get(this.url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public exists (day: string, dayTime: number): Observable<Boolean> {
    let time = '';

    switch (dayTime) {
      case EVENT_DAY_TIME.AM:
        time = '09:00:00';
        break;

      case EVENT_DAY_TIME.PM:
        time = '14:00:00';
        break;
    }

    return this.http.get(this.url, {
      search: `start=${day}T${time}`
    })
      .map(this.extractData)
      .map((events) => events.length >= 1)
      .catch(this.handleError);
  }

  public post (...events: Event[]) {
    return Observable.forkJoin(events.map((event) => this.singlePost(event)));
  }

  public singlePost (event: Event): Observable<Event> {
    return this.http.post(this.url, event)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public selectedDayTime (model: {am: Boolean, pm: Boolean}): number {
    if (model.am) {
      return EVENT_DAY_TIME.AM;
    }

    if (model.pm) {
      return EVENT_DAY_TIME.PM;
    }

    return 0;
  }

}
