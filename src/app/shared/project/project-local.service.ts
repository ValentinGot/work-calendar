import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Project } from './project.model';

@Injectable()
export class ProjectLocalService {

  constructor () { }

  public getAll (): Observable<Project[]> {
    return Observable.create((observer) => {
      observer.next([
        {
          "id": 1,
          "code": "4036",
          "client": "Télécom Santé",
          "name": "Parcours Ambulatoire"
        },
        {
          "id": 2,
          "code": "4129",
          "client": "Croix-Rouge Française",
          "name": "GAIA Lot 2"
        },
        {
          "id": 3,
          "code": "4299",
          "client": "Orange",
          "name": "Module vitrine"
        },
        {
          "id": 4,
          "code": "4332",
          "client": "ARKEA",
          "name": "Générateur"
        }
      ]);
      observer.complete();
    });
  }

  // post (project: Project): Observable<Project> {
  // }

}
