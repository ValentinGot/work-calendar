import { Component, OnInit, Inject, ViewChild, Input } from '@angular/core';
import { FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
import { MdDialogRef } from '@angular/material';
import * as moment from 'moment';

import { AddImputation } from '../add-imputation/add-imputation.class';
import { ProjectInterface } from '../../../shared/project/project.interface';
import { ProjectService } from '../../../shared/project/project.service';
import { Project } from '../../../shared/project/project.model';
import { ImputationService } from '../../../shared/imputation/imputation.service';
import { Imputation, DayTime, ImputationType } from '../../../shared/imputation/imputation.model';
import { AddImputationDialog } from '../add-imputation/add-imputation.dialog';
import { SnackbarService } from '../../../shared/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'wo-add-project',
  templateUrl: 'add-project.component.html',
  styleUrls: ['add-project.component.scss']
})
export class AddProjectComponent extends AddImputation implements OnInit {
  @Input() date: moment.Moment;
  @Input() dialogRef: MdDialogRef<AddImputationDialog>;

  form: FormGroup;
  projects: Project[];
  submitted: boolean;

  @ViewChild('projectForm') projectForm: NgForm;

  constructor(
    @Inject(ProjectService) private projectService: ProjectInterface,
    private imputationService: ImputationService,
    private formBuilder: FormBuilder,
    private snackBar: SnackbarService,
    private router: Router
  ) { super(); }

  ngOnInit() {
    this.projectService.getAll().subscribe((projects) => this.projects = projects);

    this.form = this.formBuilder.group({
      project: [ null, Validators.required ],
      am     : (new Date()).getHours() <= 12,
      pm     : (new Date()).getHours() > 12,
      comment: ''
    });

    this.$onSubmit.subscribe(() => this.projectForm.ngSubmit.emit());
  }

  onSubmit () {
    this.submitted = true;

    if (this.form.valid && (this.form.value.am || this.form.value.pm)) {
      let imputations: Imputation[] = [];

      if (this.form.value.am) {
        imputations.push(this.imputationService.make(this.date, DayTime.AM, ImputationType.PROJECT, this.form.value.project, this.form.value.comment));
      }
      if (this.form.value.pm) {
        imputations.push(this.imputationService.make(this.date, DayTime.PM, ImputationType.PROJECT, this.form.value.project, this.form.value.comment));
      }

      this.submitted = false;

      this.imputationService.create(...imputations).subscribe(
        (imputations) => this.dialogRef.close(imputations),
        (err) => this.snackBar.error(err));
    }
  }

  goToSettingsProjects () {
    this.router.navigateByUrl('/settings/projects').then(() => this.dialogRef.close());
  }

}
