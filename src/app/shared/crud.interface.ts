import { Observable } from 'rxjs';

export interface CRUDInterface<T> {

  getAll (): Observable<T[]>;

  get (id: number): Observable<T>;

  create (...types: T[]): Observable<T[]>;

  createOne (types: T): Observable<T>;

  exists (types: T): Observable<Boolean>;

  update (...types: T[]): Observable<T>;

  updateOne (id: string, imputation: T): Observable<T>;

  remove (...id: string[]): Observable<void>;

  removeOne (id: string): Observable<void>;

}
