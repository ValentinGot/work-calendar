import { Imputation } from '../imputation/imputation.model';

export interface Event {
  _id?: string,
  title: string,
  start: string,
  end: string,
  color: string,
  imputation: Imputation
}
