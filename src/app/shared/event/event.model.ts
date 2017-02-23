import { Imputation } from '../imputation/imputation.model';
import * as moment from 'moment';

export interface Event {
  _id?: string,
  title: string,
  start: moment.Moment,
  end: moment.Moment,
  color: string,
  imputation: Imputation,
  className?: string,
  twinEvent?: Event,
  allDay: boolean
}
