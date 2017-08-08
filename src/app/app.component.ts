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
    this.serviceWorkerRegistration();
  }

  private notificationConfig () {
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

  private serviceWorkerRegistration () {
    if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
      navigator.serviceWorker.register('service-worker.js')
        .then((registration) => {

          // updatefound is fired if service-worker.js changes.
          registration.onupdatefound = () => {

            // updatefound is also fired the very first time the SW is installed,
            // and there's no need to prompt for a reload at that point.
            // So check here to see if the page is already controlled,
            // i.e. whether there's an existing service worker.
            // if (navigator.serviceWorker.controller) {

            // The updatefound event implies that registration.installing is set:
            // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
            let installingWorker = registration.installing;

            installingWorker.onstatechange = () => {
              console.log('SW', installingWorker.state);

              switch (installingWorker.state) {
                case 'installed':
                  // At this point, the old content will have been purged and the
                  // fresh content will have been added to the cache.
                  // It's the perfect time to display a "New content is
                  // available; please refresh." message in the page's interface.
                  console.log('Caching complete ! Future visits will work offline');
                  break;

                case 'redundant':
                  throw new Error('The installing service worker became redundant.');

                default:
                // Ignore
              }
            };
            // }
          };
        }).catch((e) => console.error('Error during service worker registration:', e));
    }
  }

}
