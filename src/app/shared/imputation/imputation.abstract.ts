import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';

import { Imputation, DayTime, ImputationType, ImputationColors } from './imputation.model';
import { Project } from '../project/project.model';
import { Event } from '../event/event.model';
import { Activity } from '../activity/activity.model';
import { Commercial } from '../commercial/commercial.model';

export abstract class ImputationAbstract {

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
    const dateString: string = date.format('YYYY-MM-DD');

    switch (dayTime) {
      case DayTime.AM:
      default:
        return parseInt(moment(`${dateString}T09:00:00`).format('x'));

      case DayTime.PM:
        return parseInt(moment(`${dateString}T14:00:00`).format('x'));
    }
  }

  public getEndTime (date: moment.Moment, dayTime: DayTime): number {
    const dateString: string = date.format('YYYY-MM-DD');

    switch (dayTime) {
      case DayTime.AM:
      default:
        return parseInt(moment(`${dateString}T12:00:00`).format('x'));

      case DayTime.PM:
        return parseInt(moment(`${dateString}T18:00:00`).format('x'));
    }
  }

  public toEvent (imputation: Imputation): Event {
    let $key: string, // Unique ID to match current date (not time) + imputation type
      title: string,
      color: string;

    const imputationDay = moment(imputation.start).hour(0);

    switch (imputation.type) {
      case ImputationType.PROJECT:
        const project: Project = imputation.data as Project;

        $key = project.code + imputationDay.unix();
        title = `${project.code} - ${project.name}`;
        color = (moment(imputation.start).format('A') === 'AM') ? ImputationColors.AM : ImputationColors.PM;
        break;

      case ImputationType.ACTIVITY:
        const activity: Activity = imputation.data as Activity;

        $key = activity.name + imputationDay.unix();
        title = activity.name;
        color = ImputationColors.ACTIVITY;
        break;

      case ImputationType.COMMERCIAL:
        const commercial = imputation.data as Commercial;

        $key = commercial.name + imputationDay.unix();
        title = commercial.name;
        color = ImputationColors.COMMERCIAL;
        break;
    }

    return {
      $key      : $key,
      title     : title,
      start     : moment(imputation.start),
      end       : moment(imputation.end),
      color     : color,
      imputation: imputation
    };
  }

  public mergeDayEvents (events: Event[]) {
    const eventsMap = new Map<string, Event>();

    events.forEach((event: Event) => {
      if (eventsMap.has(event.$key)) {
        const existingEvent = eventsMap.get(event.$key);

        existingEvent.start = moment(this.getStartTime(moment(event.start), DayTime.AM));
        existingEvent.end = moment(this.getEndTime(moment(event.end), DayTime.PM));
        existingEvent.twinEvent = event;
        existingEvent.className = 'full-day';
        existingEvent.color = this.getColorFromType(existingEvent.imputation.type);
        if (event.imputation.comment !== '') {
          if (existingEvent.imputation.comment !== '') {
            existingEvent.imputation.comment += '\n';
          }

          existingEvent.imputation.comment += event.imputation.comment;
        }

        eventsMap.set(event.$key, existingEvent);
      } else {
        eventsMap.set(event.$key, event);
      }
    });

    return Array.from(eventsMap).map((item) => item[ 1 ]);
  }

  private getColorFromType (type: ImputationType) {
    switch (type) {
      case ImputationType.ACTIVITY:
        return ImputationColors.ACTIVITY;

      case ImputationType.COMMERCIAL:
        return ImputationColors.COMMERCIAL;

      case ImputationType.PROJECT:
      default:
        return ImputationColors.DAY_EVENT;
    }
  }

}
