import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as NeDBDataStore from 'nedb';
import * as Datastore from 'nedb';

import { CRUDInterface } from '../crud.interface';
import { Activity } from './activity.model';

@Injectable()
export class ActivityService implements CRUDInterface<Activity> {
  activities: NeDBDataStore;

  constructor () {
    this.activities = new Datastore({
      filename: 'activities',
      autoload: true
    });
  }

  public getAll (): Observable<Activity[]> {
    return Observable.create((observer) => {
      observer.next(this.defaultActivities());
      observer.complete();
    });
  }

  public get (id: number): Observable<Activity> {
    throw new Error('Not implemented');
  }

  public create (...types: Activity[]): Observable<Activity[]> {
    throw new Error('Not implemented');
  }

  public createOne (types: Activity): Observable<Activity> {
    throw new Error('Not implemented');
  }

  public exists (types: Activity): Observable<Boolean> {
    throw new Error('Not implemented');
  }

  public update (...types: Activity[]): Observable<Activity> {
    throw new Error('Not implemented');
  }

  public updateOne (id: string, imputation: Activity): Observable<Activity> {
    throw new Error('Not implemented');
  }

  public remove (...id: string[]): Observable<void> {
    throw new Error('Not implemented');
  }

  public removeOne (id: string): Observable<void> {
    throw new Error('Not implemented');
  }

  private defaultActivities (): Activity[] {
    return [
      { name: 'Prospection / Suivi client' },
      { name: 'Gestion administrative' },
      { name: 'Gestion technique' },
      { name: 'Recrutement' },
      { name: 'Maladie' },
      { name: 'Délégation' },
      { name: 'Sous-charge' },
      { name: 'Garantie' },
      { name: 'Formation' },
      { name: 'Congés (congés payés, CTD, Evénement familial, sans solde)' }
    ];
  }

}
