import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class NotificationService {
  static COLLECTION = 'notifications';

  constructor (
    private db: AngularFireDatabase
  ) { }

  push (token: string): Observable<Notification> {
    return Observable.fromPromise(this.db.list(NotificationService.COLLECTION).push({
      token: token
    }));
  }

  exists (token: string): Observable<boolean> {
    return this.db.list(NotificationService.COLLECTION, {
      query: {
        orderByChild: 'token',
        equalTo     : token
      }
    })
      .take(1)
      .map((res) => res.length > 0);
  }

}
