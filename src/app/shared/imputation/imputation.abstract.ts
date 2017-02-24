import { Observable } from 'rxjs';
import * as moment from 'moment';

import {Imputation, DayTime, ImputationType, ImputationColors, ImputationData} from './imputation.model';
import { Project } from '../project/project.model';
import { Event } from '../event/event.model';
import { Activity } from '../activity/activity.model';
import { Commercial } from '../commercial/commercial.model';

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

  public make (date: moment.Moment, dayTime: DayTime, type: ImputationType, data: Object, comment?: string): Imputation {
    return {
      start  : this.getStartTime(date, dayTime),
      end    : this.getEndTime(date, dayTime),
      type   : type,
      data   : data,
      comment: comment
    };
  }

  public getStartTime (date: moment.Moment, dayTime: DayTime): number {
    let dateString: string = date.format('YYYY-MM-DD');

    switch (dayTime) {
      case DayTime.AM:
      default:
        return parseInt(moment(`${dateString}T09:00:00`).format('x'));

      case DayTime.PM:
        return parseInt(moment(`${dateString}T14:00:00`).format('x'));
    }
  }

  public getEndTime (date: moment.Moment, dayTime: DayTime): number {
    let dateString: string = date.format('YYYY-MM-DD');

    switch (dayTime) {
      case DayTime.AM:
      default:
        return parseInt(moment(`${dateString}T12:00:00`).format('x'));

      case DayTime.PM:
        return parseInt(moment(`${dateString}T18:00:00`).format('x'));
    }
  }

  public toEvent (imputation: Imputation): Event {
    let title: string,
      color: string;

    switch (imputation.type) {
      case ImputationType.PROJECT:
        let project: Project = imputation.data as Project;

        title = `${project.code} - ${project.name}`;
        color = (moment(imputation.start).format('A') === 'AM') ? ImputationColors.AM : ImputationColors.PM;
        break;

      case ImputationType.ACTIVITY:
        title = (<Activity> imputation.data).name;
        color = ImputationColors.ACTIVITY;
        break;

      case ImputationType.COMMERCIAL:
        title = (<Commercial> imputation.data).name;
        color = ImputationColors.COMMERCIAL;
        break;
    }

    return {
      title     : title,
      start     : moment(imputation.start),
      end       : moment(imputation.end),
      color     : color,
      imputation: imputation
    };
  }

  public mergeDayEvents (events: Event[]) {
    events.forEach((event: Event) => {
      let findEvent = events.find((eventf: Event) => {
        return moment(event.start).format('ddd, ll') === moment(eventf.start).format('ddd, ll') &&
          (<ImputationData> event.imputation.data)._id === (<ImputationData> eventf.imputation.data)._id &&
          event.imputation._id !== eventf.imputation._id;
      });
      if (findEvent) {
        if (moment(event.imputation.start).format('A') === 'AM') {
          findEvent.start = event.start;
        } else {
          findEvent.end = event.end;
        }
        findEvent.twinEvent = event;
        findEvent.className = 'full-day';
        events.splice(events.indexOf(event), 1);
      }
    });

    return events;
  }
}
