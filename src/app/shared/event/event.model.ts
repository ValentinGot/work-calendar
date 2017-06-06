import * as moment from 'moment';
import { Imputation } from '../imputation/imputation.model';

export interface Event {
  $key?: string;
  title: string;
  start: moment.Moment;
  end: moment.Moment;
  color: string;
  imputation: Imputation;
  className?: string;
  twinEvent?: Event;
}
