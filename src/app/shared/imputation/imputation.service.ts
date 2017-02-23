import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as NeDBDataStore from 'nedb';
import * as Datastore from 'nedb';

import { ImputationAbstract } from './imputation.abstract';
import { Imputation } from './imputation.model';

@Injectable()
export class ImputationService extends ImputationAbstract {
  imputations: NeDBDataStore;

  constructor () {
    super();

    this.imputations = new Datastore({
      filename: './imputations.db',
      autoload: true
    });
  }

  public getAll (): Observable<Imputation[]> {
    return Observable.create((observer) => {
      this.imputations.find({}).exec((err, imputations) => {
        if (err) {
          observer.throw(err);
        }

        observer.next(imputations);
        observer.complete();
      });
    });
  }

  public get (id: number): Observable<Imputation> {
    return Observable.create((observer) => {
      this.imputations.find({ _id: id }, (err, imputation) => {
        if (err) {
          observer.throw(err);
        }

        observer.next(imputation);
        observer.complete();
      });
    });
  }

  public create (...imputations: Imputation[]): Observable<Imputation[]> {
    return Observable.forkJoin(imputations.map((imputation) => this.createOne(imputation)));
  }

  public createOne (imputation: Imputation): Observable<Imputation> {
    return Observable.create((observer) => {
      this.imputations.insert(imputation, (err, created) => {
        if (err) {
          observer.throw(err);
        }

        observer.next(created);
        observer.complete();
      });
    });
  }

  public update (id: string, imputation: Imputation): Observable<Imputation> {
    return Observable.create((observer) => {
      this.imputations.update({ _id: id }, imputation, (err) => {
        if (err) {
          observer.throw(err);
        }

        observer.next(imputation);
        observer.complete();
      });
    });
  }

  public remove (id: string): Observable<void> {
    return Observable.create((observer) => {
      this.imputations.remove({ _id: id }, (err) => {
        if (err) {
          observer.throw(err);
        }

        observer.complete();
      });
    });
  }
}
