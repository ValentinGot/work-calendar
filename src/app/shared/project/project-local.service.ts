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
      this.projects.find({}).sort({ code: 1 }).exec((err, projects) => {
        if (err) {
          observer.error(err);
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
          observer.error(err);
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
          observer.error(err);
        }

        observer.next(created);
        observer.complete();
      });
    });
  }

  public update (id: string, project: Project): Observable<Project> {
    return Observable.create((observer) => {
      this.projects.update({ _id: id }, project, (err) => {
        if (err) {
          observer.error(err);
        }

        observer.next(project);
        observer.complete();
      });
    });
  }

  public remove (id: string): Observable<void> {
    return Observable.create((observer) => {
      this.projects.remove({ _id: id }, (err) => {
        if (err) {
          observer.error(err);
        }

        observer.complete();
      });
    });
  }
}
