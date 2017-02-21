import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'wo-settings-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  form: FormGroup;

  constructor (
    private formBuilder: FormBuilder
  ) { }

  ngOnInit () {
    this.form = this.formBuilder.group({
      id     : '',
      client : '',
      project: ''
    });
  }

  onSubmit (form) {
    console.log(form);
  }

}
