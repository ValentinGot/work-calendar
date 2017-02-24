
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
  AM        : '#ED7F68',
  PM        : '#86D286',
  ACTIVITY  : '#AFB3F7',
  COMMERCIAL: '#94C9A9'
};
