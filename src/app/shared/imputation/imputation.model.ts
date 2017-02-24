import { Project } from '../project/project.model';

// export interface Imputation<T> {
export interface Imputation {
  _id?: string,
  start: number,
  end?: number,
  // typeOf: ImputationType,
  // type: T,
  project: Project,
  comment?: string
}

export enum ImputationType {
  PROJECT,
  ACTIVITY,
  COMMERCIAL
}

export enum DayTime {
  AM, PM
}

export const ImputationColors = {
  AM: '#ED7F68',
  PM: '#86D286'
};
