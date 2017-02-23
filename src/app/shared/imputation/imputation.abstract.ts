import { Observable } from 'rxjs';

import { Imputation, DayTime } from './imputation.model';
import { Project } from '../project/project.model';
import * as moment from 'moment';


export abstract class ImputationAbstract {

  abstract getAll (): Observable<Imputation[]>;

  abstract get (id: number): Observable<Imputation>;

  abstract create (...imputations: Imputation[]): Observable<Imputation[]>;

  abstract createOne (imputation: Imputation): Observable<Imputation>;

  abstract exists (imputation: Imputation): Observable<Boolean>;

  abstract update (imputations: Array<Imputation>): Observable<Imputation[]>;

  abstract updateOne (id: string, imputation: Imputation): Observable<Imputation>;

  abstract removeOne (id: string): Observable<void>;

  abstract remove (ids: Array<string>): Observable<void[]>

  public make (date: any, dayTime: DayTime, project: Project, comment?: string): Imputation {
    return {
      start  : this.getStartTime(date, dayTime),
      end    : this.getEndTime(date, dayTime),
      project: project,
      comment: comment
    };
  }

  public getStartTime (date: any, dayTime: DayTime): number {
    let dateString: string = date.format('YYYY-MM-DD');

    switch (dayTime) {
      case DayTime.AM:
      default:
        return parseInt(moment(`${dateString}T09:00:00`).format('x'));

      case DayTime.PM:
        return parseInt(moment(`${dateString}T14:00:00`).format('x'));
    }
  }

  public getEndTime (date: any, dayTime: DayTime): number {
    let dateString: string = date.format('YYYY-MM-DD');

    switch (dayTime) {
      case DayTime.AM:
      default:
        return parseInt(moment(`${dateString}T12:00:00`).format('x'));

      case DayTime.PM:
        return parseInt(moment(`${dateString}T18:00:00`).format('x'));
    }
  }

}
