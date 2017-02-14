import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

import { HttpResponseHandler } from '../http-response-handler';
import { environment } from '../../../environments/environment';
import { Event, EventDayTime } from './event.model';

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

  public exists (day: string, dayTime: string): Observable<Boolean> {
    let time = '';

    switch (dayTime) {
      case 'am':
        time = '09:00:00';
        break;

      case 'pm':
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

}
