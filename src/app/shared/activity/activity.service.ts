import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as NeDBDataStore from 'nedb';
import * as Datastore from 'nedb';

import { CRUDInterface } from '../crud.interface';
import { Activity } from './activity.model';

@Injectable()
export class ActivityService implements CRUDInterface<Activity> {
  activities: NeDBDataStore;

  constructor (
    private zone: NgZone
  ) {
    this.activities = new Datastore({
      filename: 'activities',
      autoload: true
    });
  }

  public getAll (): Observable<Activity[]> {
    return Observable.create((observer) => {
      this.activities.find({}).sort({ code: 1 }).exec((err, activities: Activity[]) => {
        if (err) {
          observer.error(err);
        }

        observer.next(this.defaultActivities().concat(activities));
        this.zone.run((() => observer.complete())); // NeDB is running outside the angular context
      });
    });
  }

  public get (id: number): Observable<Activity> {
    throw new Error('Not implemented');
  }

  public create (...activities: Activity[]): Observable<Activity[]> {
    throw new Error('Not implemented');
  }

  public createOne (activity: Activity): Observable<Activity> {
    return Observable.create((observer) => {
      this.activities.insert(activity, (err, created) => {
        if (err) {
          observer.error(err);
        }

        observer.next(created);
        this.zone.run((() => observer.complete())); // NeDB is running outside the angular context
      });
    });
  }

  public exists (activity: Activity): Observable<Boolean> {
    throw new Error('Not implemented');
  }

  public update (...activities: Activity[]): Observable<Activity> {
    throw new Error('Not implemented');
  }

  public updateOne (id: string, activity: Activity): Observable<Activity> {
    return Observable.create((observer) => {
      this.activities.update({ _id: id }, activity, (err) => {
        if (err) {
          observer.error(err);
        }

        observer.next(activity);
        this.zone.run((() => observer.complete())); // NeDB is running outside the angular context
      });
    });
  }

  public remove (...id: string[]): Observable<void> {
    throw new Error('Not implemented');
  }

  public removeOne (id: string): Observable<void> {
    return Observable.create((observer) => {
      this.activities.remove({ _id: id }, (err) => {
        if (err) {
          observer.error(err);
        }

        this.zone.run((() => observer.complete())); // NeDB is running outside the angular context
      });
    });
  }

  private defaultActivities (): Activity[] {
    return [
      { name: 'Prospection / Suivi client', fixed: true },
      { name: 'Gestion administrative', fixed: true },
      { name: 'Gestion technique', fixed: true },
      { name: 'Recrutement', fixed: true },
      { name: 'Maladie', fixed: true },
      { name: 'Délégation', fixed: true },
      { name: 'Sous-charge', fixed: true },
      { name: 'Garantie', fixed: true },
      { name: 'Formation', fixed: true },
      { name: 'Congés (congés payés, CTD, Evénement familial, sans solde)', fixed: true }
    ];
  }

}
