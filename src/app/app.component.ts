import { Component, OnInit } from '@angular/core';
import { MdIconRegistry, MdSnackBar } from '@angular/material';
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
    private snackBar: MdSnackBar,
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
    this.serviceWorkerRegistration();
  }

  private notificationConfig () {
    if (window.location.protocol === 'https:' && environment.production) {
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

  private serviceWorkerRegistration () {
    if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
      navigator.serviceWorker.register('service-worker.js')
        .then((registration) => {

          // updatefound is fired if service-worker.js changes.
          registration.onupdatefound = () => {

            if (navigator.serviceWorker.controller) {
              // At this point, the old content will have been purged and the fresh content will
              // have been added to the cache.
              // It's the perfect time to display a "New content is available; please refresh."
              // message in the page's interface.

              const snackBarRef = this.snackBar.open('Une nouvelle version est disponible', 'Actualiser', {
                extraClasses: [ 'highlight-action' ]
              });

              snackBarRef.onAction().subscribe(() => {
                location.reload(true);
              });
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a "Content is cached for offline use." message.

              this.snackBar.open(`L'application est maintenant disponible hors ligne`, {
                duration: 2000
              });
            }
          };
        }).catch((e) => console.error('Error during service worker registration:', e));
    }
  }

}
