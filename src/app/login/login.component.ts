import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'wo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor (
    private afAuth: AngularFireAuth
  ) { }

  signIn () {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

    this.afAuth.auth.signInWithRedirect(googleAuthProvider);
  }

}
