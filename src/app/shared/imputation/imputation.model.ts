import { Project } from '../project/project.model';

export interface Imputation {
  _id?: string,
  start: number,
  end?: number,
  project: Project,
  comment?: string
}

export enum DayTime {
  AM, PM
}

export const ImputationColors = {
  AM: '#ED7F68',
  PM: '#86D286'
};
