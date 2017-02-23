import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as NeDBDataStore from 'nedb';
import * as Datastore from 'nedb';
import * as moment from 'moment';

import { ImputationAbstract } from './imputation.abstract';
import {Imputation, DayTime} from './imputation.model';

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
          observer.error(err);
        }

        observer.next(imputations);
        observer.complete();
      });
    });
  }

  public getAllRange (start: moment.Moment, end: moment.Moment): Observable<Imputation[]> {
    return Observable.create((observer) => {
      this.imputations.find({start: {$gt: parseInt(start.format('x')), $lt: parseInt(end.format('x')) } }).exec((err, imputations) => {
        if (err) {
          observer.error(err);
        }

        observer.next(imputations);
        observer.complete();
      });
    });
  }

  public getForDay (day: moment.Moment): Observable<Imputation[]> {
    return Observable.create((observer) => {
      this.imputations.find({start: {$in: [this.getStartTime(day, DayTime.AM), this.getStartTime(day, DayTime.PM)] } }).exec((err, imputations) => {
        if (err) {
          observer.error(err);
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
          observer.error(err);
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
      this.exists(imputation).subscribe((exists) => {
        if (!exists) {
          this.imputations.insert(imputation, (err, created) => {
            if (err) {
              observer.error(err);
            }

            observer.next(created);
            observer.complete();
          });
        } else {
          observer.error(`There is already an imputation at this day time`);
        }
      });
    });
  }

  public exists (imputation: Imputation): Observable<Boolean> {
    return Observable.create((observer) => {
      this.imputations.find({ start: imputation.start }, (err, imputations) => {
        if (err) {
          observer.error(err);
        }

        observer.next(imputations.length > 0);
        observer.complete();
      });
    });
  }

  public update (imputations: Array<Imputation>) {
    return Observable.forkJoin(imputations.map((imputation) => this.updateOne(imputation._id, imputation)));
  }

  public updateOne (id: string, imputation: Imputation): Observable<Imputation> {
    return Observable.create((observer) => {
      this.imputations.update({ _id: id }, imputation, (err) => {
        if (err) {
          observer.error(err);
        }

        observer.next(imputation);
        observer.complete();
      });
    });
  }

  public remove (ids: Array<string>): Observable<void[]> {
    return Observable.forkJoin(ids.map((id) => this.removeOne(id)));
  }

  public removeOne (id: string): Observable<void> {
    return Observable.create((observer) => {
      this.imputations.remove({ _id: id }, (err) => {
        if (err) {
          observer.error(err);
        }

        observer.next(id);
        observer.complete();
      });
    });
  }
}
