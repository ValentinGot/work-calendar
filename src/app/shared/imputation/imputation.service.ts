import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toPromise';

import { ImputationAbstract } from './imputation.abstract';
import { Imputation } from './imputation.model';

@Injectable()
export class ImputationService extends ImputationAbstract {
  static COLLECTION = 'imputations';

  constructor (
    private db: AngularFireDatabase
  ) {
    super();
  }

  public getAllRange (start: moment.Moment, end: moment.Moment): Observable<Imputation[]> {
    return this.db.list(ImputationService.COLLECTION, {
      query: {
        orderByChild: 'start',
        startAt: parseInt(start.format('x')),
        endAt: parseInt(end.format('x')),
      }
    }).take(1);
  }

  public create (...imputations: Imputation[]): Observable<Imputation[]> {
    return Observable.forkJoin(imputations.map((imputation) => this.createOne(imputation)));
  }

  public createOne (imputation: Imputation): Observable<Imputation> {
    return Observable.fromPromise(this.db.list(ImputationService.COLLECTION).push(imputation));
  }

  public update (imputations: Array<Imputation>) {
    return Observable.forkJoin(imputations.map((imputation) => this.updateOne(imputation.$key, imputation)));
  }

  public updateOne (id: string, imputation: Imputation): Observable<void> {
    delete imputation.$key;

    return Observable.fromPromise(this.db.list(ImputationService.COLLECTION).update(id, imputation));
  }

  public remove (ids: Array<string>): Observable<void[]> {
    return Observable.forkJoin(ids.map((id) => this.removeOne(id)));
  }

  public removeOne (id: string): Observable<void> {
    return Observable.fromPromise(this.db.list(ImputationService.COLLECTION).remove(id));
  }

}
