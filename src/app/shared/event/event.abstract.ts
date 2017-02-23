import { Observable } from 'rxjs';

import { Event, DayTime } from './event.model';
import { Project } from '../project/project.model';

export abstract class EventAbstract {

  abstract getAll (): Observable<Event[]>;

  abstract get (id: number): Observable<Event>;

  abstract create (...events: Event[]): Observable<Event[]>;

  abstract createOne (event: Event): Observable<Event>;

  abstract update (id: string, event: Event): Observable<Event>;

  abstract remove (id: string): Observable<void>;

  public make (date: any, dayTime: DayTime, project: Project, comment?: string): Event {
    let event: Event = {
      start: this.getStartTime(date, dayTime),
      end: this.getEndTime(date, dayTime),
      project: project,
    };

    if (comment) {
      event.comment = comment;
    }

    return event;
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
