import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AddImputation } from '../add-imputation/add-imputation.class';
import { ProjectService } from '../../../shared/project/project.service';
import { Project } from '../../../shared/project/project.model';
import { ImputationService } from '../../../shared/imputation/imputation.service';
import { Imputation, DayTime, ImputationType } from '../../../shared/imputation/imputation.model';
import { SnackbarService } from '../../../shared/snackbar.service';

@Component({
  selector: 'wo-add-project',
  templateUrl: 'add-project.component.html',
  styleUrls: ['add-project.component.scss']
})
export class AddProjectComponent extends AddImputation implements OnInit {
  form: FormGroup;
  projects: Project[];
  submitted: boolean;

  @ViewChild('projectForm') projectForm: NgForm;

  constructor(
    private projectService: ProjectService,
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
      const imputations: Imputation[] = [];

      if (this.form.value.am && !this.exists(DayTime.AM)) {
        imputations.push(this.imputationService.make(
          this.date,
          DayTime.AM,
          ImputationType.PROJECT,
          this.form.value.project,
          this.form.value.comment
        ));
      }
      if (this.form.value.pm && !this.exists(DayTime.PM)) {
        imputations.push(this.imputationService.make(
          this.date,
          DayTime.PM,
          ImputationType.PROJECT,
          this.form.value.project,
          this.form.value.comment
        ));
      }

      this.submitted = false;

      this.imputationService.create(...imputations).subscribe(
        (items) => {
          this.submitted = false;

          this.dialogRef.close(items);
        },
        (err) => this.snackBar.error(err));
    }
  }

  goToSettingsProjects () {
    this.router.navigateByUrl('/settings/projects').then(() => this.dialogRef.close());
  }

}
