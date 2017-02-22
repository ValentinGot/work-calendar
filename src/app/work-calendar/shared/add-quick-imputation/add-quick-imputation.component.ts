import { Component, OnInit, Inject, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';

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
  submitted: boolean;

  @ViewChild('quickImputationForm') quickImputationForm: NgForm;

  $onSubmit: EventEmitter<boolean>;

  constructor(
    @Inject(ProjectService) private projectService: ProjectInterface,
    private formBuilder: FormBuilder
  ) {
    this.$onSubmit = new EventEmitter<boolean>();
  }

  ngOnInit() {
    this.projectService.getAll().subscribe((projects) => this.projects = projects);

    this.form = this.formBuilder.group({
      project: [ null, Validators.required ],
      am     : (new Date()).getHours() <= 12,
      pm     : (new Date()).getHours() > 12
    });

    this.$onSubmit.subscribe(() => this.quickImputationForm.ngSubmit.emit());
  }

  onSubmit () {
    this.submitted = true;

    if (this.form.valid && (this.form.value.am || this.form.value.pm)) {
      console.log(this.form.value);

      this.submitted = false;
    }
  }

}
