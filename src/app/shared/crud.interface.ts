import { Observable } from 'rxjs/Observable';

export interface CRUDInterface<T> {

  getAll (): Observable<T[]>;

  create (item: T): Observable<T>;

  update (id: string, item: T): Observable<void>;

  remove (id: string): Observable<void>;

}
