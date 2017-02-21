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
    }
  ];
  active: string;

  constructor (
    private router: Router
  ) { }

  ngOnInit () {
    this.router.events.subscribe((route) => {
      this.active = this.menu.find((item) => item.url === route.url).name;
    });
  }

}
