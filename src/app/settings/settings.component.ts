import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'wo-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  menu = [
    {
      url: '/settings/projects',
      name: 'Projets'
    },
    {
      url: '/settings/activities',
      name: 'Activités'
    }
  ];
  active: string;

  constructor (
    private router: Router
  ) { }

  ngOnInit () {
    this.router.events.subscribe((route) => {
      console.log(route.toString());
      // let item = this.menu.find((item) => item.url === route.url);
      //
      // this.active = (item !== undefined) ? item.name : '';
    });
  }

}
