import { Observable } from 'rxjs';

import { Project } from './project.model';

export interface ProjectInterface {

  getAll(): Observable<Project[]>;

  get(): Observable<Project>;

  post(project: Project): Observable<Project>;

  put(projectId: number, project: Project): Observable<Project>;

  remove(projectId: number): Observable<void>;

}
