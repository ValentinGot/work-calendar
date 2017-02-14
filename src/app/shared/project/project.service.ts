import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

import { HttpResponseHandler } from '../http-response-handler';
import { environment } from '../../../environments/environment';
import { Project } from './project.model';

@Injectable()
export class ProjectService extends HttpResponseHandler {
  private baseUrl: string = '/projects';
  private url : string;

  constructor (
    private http: Http
  ) {
    super();

    this.url = `${environment.url}${this.baseUrl}`;
  }

  public getAll (): Observable<Project[]> {
    return this.http.get(this.url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public post (project: Project): Observable<Project> {
    return this.http.post(this.url, project)
      .map(this.extractData)
      .catch(this.handleError);
  }

}
