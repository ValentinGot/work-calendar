import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthenticatedGuard implements CanLoad {

  constructor (
    private router: Router,
    private afAuth: AngularFireAuth
  ) {}

  canLoad (): Observable<boolean> {
    return this.afAuth.authState.take(1).map((authState) => {
      const isAuthenticated = !!authState;

      if (isAuthenticated) {
        this.router.navigate([ '/work-calendar' ]);

        return false;
      }

      return true;
    });
  }
}
