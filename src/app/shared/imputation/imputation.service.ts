import {Injectable, NgZone} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as NeDBDataStore from 'nedb';
import * as Datastore from 'nedb';
import * as moment from 'moment';

import { ImputationAbstract } from './imputation.abstract';
import {Imputation, DayTime} from './imputation.model';

@Injectable()
export class ImputationService extends ImputationAbstract {
  imputations: NeDBDataStore;

  constructor (private zone: NgZone) {
    super();

    this.imputations = new Datastore({
      filename: 'imputations',
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
        this.zone.run((() => observer.complete())); // NeDB is running outside the angular context
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
        this.zone.run((() => observer.complete())); // NeDB is running outside the angular context
      });
    });
  }

  public getForDay (day: moment.Moment): Observable<Imputation[]> {
    return Observable.create((observer) => {
      this.imputations
        .find({start: {$in: [this.getStartTime(day, DayTime.AM), this.getStartTime(day, DayTime.PM)] } })
        .exec((err, imputations) => {
          if (err) {
            observer.error(err);
          }

          observer.next(imputations);
          this.zone.run((() => observer.complete())); // NeDB is running outside the angular context
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
        this.zone.run((() => observer.complete())); // NeDB is running outside the angular context
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
            this.zone.run((() => observer.complete())); // NeDB is running outside the angular context
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
        this.zone.run((() => observer.complete())); // NeDB is running outside the angular context
      });
    });
  }

  public update (imputations: Array<Imputation>) {
    return Observable.forkJoin(imputations.map((imputation) => this.updateOne(imputation.$key, imputation)));
  }

  public updateOne (id: string, imputation: Imputation): Observable<Imputation> {
    return Observable.create((observer) => {
      this.imputations.update({ _id: id }, imputation, (err) => {
        if (err) {
          observer.error(err);
        }

        observer.next(imputation);
        this.zone.run((() => observer.complete())); // NeDB is running outside the angular context
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
        this.zone.run((() => observer.complete())); // NeDB is running outside the angular context
      });
    });
  }
}
