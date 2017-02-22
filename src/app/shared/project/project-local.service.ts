import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as NeDBDataStore from 'nedb';
import * as Datastore from 'nedb';

import { Project } from './project.model';
import { ProjectInterface } from './project.interface';

@Injectable()
export class ProjectLocalService implements ProjectInterface {
  projects: NeDBDataStore;

  constructor () {
    this.projects = new Datastore({
      filename: './projects.db',
      autoload: true
    });
  }

  public getAll (): Observable<Project[]> {
    return Observable.create((observer) => {
      this.projects.find({}, (err, projects) => {
        if (err) {
          observer.throw(err);
        }

        observer.next(projects);
        observer.complete();
      });
    });
  }

  public get (id: number): Observable<Project> {
    return Observable.create((observer) => {
      this.projects.find({ _id: id }, (err, project) => {
        if (err) {
          observer.throw(err);
        }

        observer.next(project);
        observer.complete();
      });
    });
  }

  public create (project: Project): Observable<Project> {
    return Observable.create((observer) => {
      this.projects.insert(project, (err, created) => {
        if (err) {
          observer.throw(err);
        }

        observer.next(created);
        observer.complete();
      });
    });
  }

  public update (id: string, project: Project): Observable<Project> {
    return Observable.create((observer) => {
      observer.complete();
    });
  }

  public remove (id: string): Observable<void> {
    return Observable.create((observer) => {
      observer.complete();
    });
  }
}
