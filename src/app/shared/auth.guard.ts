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
    return this.afAuth.authState
      .first()
      .map((authState) => !!authState)
      .do((authenticated: boolean) => {
        if (!authenticated) {
          this.router.navigate([ '/login' ]);
        }
      });
  }
}
