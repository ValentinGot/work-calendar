import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthGuard implements CanLoad {

  constructor (
    private router: Router,
    private afAuth: AngularFireAuth
  ) {}

  canLoad () {
    return this.afAuth.authState.take(1).map((authState) => {
      const isAuthenticated = !!authState;

      if (!isAuthenticated) {
        this.router.navigate([ '/login' ]);

        return false;
      }

      return true;
    });
  }
}
