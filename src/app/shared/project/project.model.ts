import { ImputationData } from '../imputation/imputation.model';

export interface Project extends ImputationData {
  code: string;
  client: string;
  name: string;
}
