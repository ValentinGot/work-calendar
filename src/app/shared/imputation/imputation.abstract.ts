import { Observable } from 'rxjs';

import { Imputation, DayTime } from './imputation.model';
import { Project } from '../project/project.model';

export abstract class ImputationAbstract {

  abstract getAll (): Observable<Imputation[]>;

  abstract get (id: number): Observable<Imputation>;

  abstract create (...imputations: Imputation[]): Observable<Imputation[]>;

  abstract createOne (imputation: Imputation): Observable<Imputation>;

  abstract update (id: string, imputation: Imputation): Observable<Imputation>;

  abstract remove (id: string): Observable<void>;

  public make (date: any, dayTime: DayTime, project: Project, comment?: string): Imputation {
    let imputation: Imputation = {
      start: this.getStartTime(date, dayTime),
      end: this.getEndTime(date, dayTime),
      project: project,
    };

    if (comment) {
      imputation.comment = comment;
    }

    return imputation;
  }

  public getStartTime (date: any, dayTime: DayTime) {
    let dateString: string = date.format('YYYY-MM-DD');

    switch (dayTime) {
      case DayTime.AM:
      default:
        return `${dateString}T09:00:00`;

      case DayTime.PM:
        return `${dateString}T14:00:00`;
    }
  }

  public getEndTime (date: any, dayTime: DayTime) {
    let dateString: string = date.format('YYYY-MM-DD');

    switch (dayTime) {
      case DayTime.AM:
      default:
        return `${dateString}T12:00:00`;

      case DayTime.PM:
        return `${dateString}T18:00:00`;
    }
  }

}
