import { Imputation } from '../imputation/imputation.model';

export interface Event {
  title: string,
  start: string,
  end: string,
  color: string,
  imputation: Imputation
}
