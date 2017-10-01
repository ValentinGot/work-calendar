export interface Imputation {
  $key?: string;
  start: number;
  end?: number;
  type: ImputationType;
  data: Object;
  comment?: string;
}

export interface ImputationData {
  $key?: string;
  color?: string;
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
  PROJECT   : '#E36397',
  ACTIVITY  : '#AFB3F7',
  COMMERCIAL: '#94C9A9'
};
