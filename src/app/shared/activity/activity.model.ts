import { ImputationData } from '../imputation/imputation.model';

export interface Activity extends ImputationData {
  name: string;
  fixed?: boolean;
}
