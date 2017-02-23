import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as NeDBDataStore from 'nedb';
import * as Datastore from 'nedb';

import { EventAbstract } from './event.abstract';
import { Event } from './event.model';

@Injectable()
export class EventService extends EventAbstract {
  events: NeDBDataStore;

  constructor () {
    super();

    this.events = new Datastore({
      filename: './events.db',
      autoload: true
    });
  }

  public getAll (): Observable<Event[]> {
    return Observable.create((observer) => {
      this.events.find({}).exec((err, events) => {
        if (err) {
          observer.throw(err);
        }

        observer.next(events);
        observer.complete();
      });
    });
  }

  public get (id: number): Observable<Event> {
    return Observable.create((observer) => {
      this.events.find({ _id: id }, (err, event) => {
        if (err) {
          observer.throw(err);
        }

        observer.next(event);
        observer.complete();
      });
    });
  }

  public create (...events: Event[]): Observable<Event[]> {
    return Observable.forkJoin(events.map((event) => this.createOne(event)));
  }

  public createOne (event: Event): Observable<Event> {
    return Observable.create((observer) => {
      this.events.insert(event, (err, created) => {
        if (err) {
          observer.throw(err);
        }

        observer.next(created);
        observer.complete();
      });
    });
  }

  public update (id: string, event: Event): Observable<Event> {
    return Observable.create((observer) => {
      this.events.update({ _id: id }, event, (err) => {
        if (err) {
          observer.throw(err);
        }

        observer.next(event);
        observer.complete();
      });
    });
  }

  public remove (id: string): Observable<void> {
    return Observable.create((observer) => {
      this.events.remove({ _id: id }, (err) => {
        if (err) {
          observer.throw(err);
        }

        observer.complete();
      });
    });
  }
}
