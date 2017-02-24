export interface Imputation {
  _id?: string,
  start: number,
  end?: number,
  type: ImputationType,
  data: Object,
  comment?: string
}

export interface ImputationData {
  _id: string
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
  AM        : '#49C6E5',
  PM        : '#FFA69E',
  ACTIVITY  : '#AFB3F7',
  COMMERCIAL: '#94C9A9'
};
