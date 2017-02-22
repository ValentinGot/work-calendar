import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ProjectService } from '../../shared/project/project.service';
import { Project } from '../../shared/project/project.model';

@Component({
  selector: 'wo-settings-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  form: FormGroup;
  projects: Project[];
  submitted: boolean;

  constructor (
    private formBuilder: FormBuilder,
    private projectService: ProjectService
  ) { }

  ngOnInit () {
    this.projectService.getAll().subscribe((projects) => this.projects = projects);

    this.form = this.formBuilder.group({
      code: [ '', Validators.required ],
      client: [ '', Validators.required ],
      project: [ '', Validators.required ]
    });
  }

  onSubmit (form: FormGroup) {
    this.submitted = true;
  }

}
