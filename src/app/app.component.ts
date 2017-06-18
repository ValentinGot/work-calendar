import { Component, OnInit } from '@angular/core';
import { MdIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { FirebaseApp } from 'angularfire2';
import 'firebase';
import { environment } from '../environments/environment';
import { NotificationService } from './shared/notification/notification.service';

@Component({
  selector: 'wo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor (
    private iconRegistry: MdIconRegistry,
    private notificationService: NotificationService,
    private sanitizer: DomSanitizer,
    private af: FirebaseApp
  ) {}

  ngOnInit () {
    this.iconRegistry.addSvgIcon(
      'google',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/google.svg')
    );

    this.notificationConfig();
  }

  notificationConfig () {
    if (environment.production) {
      const messaging = this.af.messaging();

      // Request permission to send notifications
      messaging.requestPermission()
        .then(() => messaging.getToken())
        .then((token) => {
          console.log('Notification :: Instance ID Token', token);

          this.notificationService.exists(token).subscribe((exists) => {
            if (!exists) {
              this.notificationService.push(token).subscribe(() => {
                console.log(`Notification :: Token saved in server's database`);
              });
            }
          });
        })
        .catch((err) => console.error('Notification', err));


      // Callback fired if the Instance ID token is updated
      messaging.onTokenRefresh(() => {
        messaging.getToken()
          .then((refreshedToken) => {
            console.log('Notification :: Refresh :: Instance ID Token', refreshedToken);

            this.notificationService.exists(refreshedToken).subscribe((exists) => {
              if (!exists) {
                this.notificationService.push(refreshedToken).subscribe(() => {
                  console.log(`Notification :: Token saved in server's database`);
                });
              }
            });
          })
          .catch((err) => console.error('Notification :: Unable to retrieve refreshed token', err));
      });

      // Handle incoming messages. Called when:
      // - a message is received while the app has focus
      // - the user clicks on an app notification created by a service worker
      //   `messaging.setBackgroundMessageHandler` handler.
      messaging.onMessage((message) => {
        console.log('Notification :: Message received', message);
      });
    }
  }

}
