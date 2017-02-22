import { Observable } from 'rxjs';

import { Project } from './project.model';

export interface ProjectInterface {

  getAll (): Observable<Project[]>;

  get (id: number): Observable<Project>;

  create (project: Project): Observable<Project>;

  update (id: string, project: Project): Observable<Project>;

  remove (id: string): Observable<void>;

}
