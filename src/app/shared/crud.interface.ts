import { Observable } from 'rxjs';

export interface CRUDInterface<T> {

  getAll (): Observable<T[]>;

  get (id: number): Observable<T>;

  create (...types: T[]): Observable<T[]>;

  createOne (type: T): Observable<T>;

  exists (type: T): Observable<Boolean>;

  update (...types: T[]): Observable<T>;

  updateOne (id: string, type: T): Observable<T>;

  remove (...id: string[]): Observable<void>;

  removeOne (id: string): Observable<void>;

}
