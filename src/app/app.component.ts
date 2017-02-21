import { Component, OnInit } from '@angular/core';
import * as Datastore from 'nedb';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {

  ngOnInit () {
    // let db = new Datastore({
    //   filename: './storage.db',
    //   autoload: true
    // });

    // db.insert({
    //   msg: 'test'
    // }, (err, newDoc) => {
    //   console.log(err, newDoc);
    // });

    // db.find({}, (err, docs) => {
    //   console.log(err, docs);
    // });
  }

}
