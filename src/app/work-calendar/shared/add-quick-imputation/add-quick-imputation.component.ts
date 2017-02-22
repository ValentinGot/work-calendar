import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { ProjectInterface } from '../../../shared/project/project.interface';
import { ProjectService } from '../../../shared/project/project.service';
import { Project } from '../../../shared/project/project.model';

@Component({
  selector: 'wo-add-quick-imputation',
  templateUrl: './add-quick-imputation.component.html',
  styleUrls: ['./add-quick-imputation.component.scss']
})
export class AddQuickImputationComponent implements OnInit {
  form: FormGroup;
  projects: Project[];

  constructor(
    @Inject(ProjectService) private projectService: ProjectInterface,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.projectService.getAll().subscribe((projects) => this.projects = projects);

    this.form = this.formBuilder.group({
      project: null,
      am     : (new Date()).getHours() <= 12,
      pm     : (new Date()).getHours() > 12
    });
  }

}
