import { Component, OnInit } from '@angular/core';
import { MdIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'wo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor (
    private iconRegistry: MdIconRegistry,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit () {
    this.iconRegistry.addSvgIcon(
      'google',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/google.svg')
    );
    // const db = firebase.database();

    // db.ref('projects').once('value').then((res) => {
    //   console.log(res);
    // })
    // db.ref('project').orderByKey().on('value', function(snapshot) {
    //   console.log(snapshot);
    // });
    // db.ref('projects').once('value').then((snapshot) => {
    //   console.log(snapshot.val());
    // });

    // db.ref(`projects`).push({
    //   code: '4369-02',
    //   client: 'Croix-Rouge Française',
    //   name: 'Outil Maraudes'
    // });
  }

}
