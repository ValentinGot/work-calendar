import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

import { Project } from './project.model';
import { CRUDInterface } from '../crud.interface';

@Injectable()
export class ProjectService implements CRUDInterface<Project> {
  static COLLECTION = 'projects';

  constructor (
    private db: AngularFireDatabase
  ) {}

  getAll (): Observable<Project[]> {
    return this.db.list(ProjectService.COLLECTION);
  }

  create (project: Project): Observable<Project> {
    return Observable.fromPromise(this.db.list(ProjectService.COLLECTION).push(project));
  }

  update (id: string, project: Project): Observable<void> {
    delete project.$key;

    return Observable.fromPromise(this.db.list(ProjectService.COLLECTION).update(id, project));
  }

  remove (id: string): Observable<void> {
    return Observable.fromPromise(this.db.list(ProjectService.COLLECTION).remove(id));
  }

}
