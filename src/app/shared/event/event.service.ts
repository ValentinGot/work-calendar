import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

import { HttpResponseHandler } from '../http-response-handler';
import { environment } from '../../../environments/environment';
import { Event } from './event.model';

@Injectable()
export class EventService extends HttpResponseHandler {
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

  post (event: Event): Observable<Event> {
    return this.http.post(this.url, event)
      .map(this.extractData)
      .catch(this.handleError);
  }

}
