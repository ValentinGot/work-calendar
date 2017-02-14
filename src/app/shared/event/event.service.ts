import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

import { HttpResponseHandler } from '../http-response-handler';
import { environment } from '../../../environments/environment';
import { Event } from './event.model';

@Injectable()
export class EventService extends HttpResponseHandler {
  public DAY_TIME = {
    AM: 1,
    PM: 2
  };

  private baseUrl: string = '/events';
  private url : string;

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
      case this.DAY_TIME.AM:
        time = '09:00:00';
        break;

      case this.DAY_TIME.PM:
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

  public post (event: Event): Observable<Event> {
    return this.http.post(this.url, event)
      .map(this.extractData)
      .catch(this.handleError);
  }

}
