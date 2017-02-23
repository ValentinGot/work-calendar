import { Project } from '../project/project.model';

export interface Event {
  _id?: string,
  start: string,
  end?: string,
  color?: string,
  project: Project,
  comment?: string
}

export enum DayTime {
  AM, PM
}

export const EventColors = {
  AM: '#ED7F68',
  PM: '#86D286'
};
