import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

import { Activity } from './activity.model';
import { CRUDInterface } from '../crud.interface';

@Injectable()
export class ActivityService implements CRUDInterface<Activity> {
  static COLLECTION = 'activities';

  constructor (
    private db: AngularFireDatabase
  ) {}

  getAll (): Observable<Activity[]> {
    return this.db.list(ActivityService.COLLECTION)
      .map((activities) => this.defaultActivities().concat(activities));
  }

  create (project: Activity): Observable<Activity> {
    return Observable.fromPromise(this.db.list(ActivityService.COLLECTION).push(project));
  }

  update (id: string, project: Activity): Observable<void> {
    delete project.$key;

    return Observable.fromPromise(this.db.list(ActivityService.COLLECTION).update(id, project));
  }

  remove (id: string): Observable<void> {
    return Observable.fromPromise(this.db.list(ActivityService.COLLECTION).remove(id));
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
