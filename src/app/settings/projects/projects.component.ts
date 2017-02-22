import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ProjectService } from '../../shared/project/project.service';
import { Project } from '../../shared/project/project.model';
import { ProjectInterface } from '../../shared/project/project.interface';
import { SnackbarService } from '../../shared/snackbar.service';

@Component({
  selector: 'wo-settings-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  form: FormGroup;
  projects: Project[];
  submitted: boolean;
  loading: boolean;

  constructor (
    @Inject(ProjectService) private projectService: ProjectInterface,
    private formBuilder: FormBuilder,
    private snackBar: SnackbarService
  ) { }

  ngOnInit () {
    this.loading = true;

    this.projectService.getAll().subscribe((projects) => {
      this.projects = projects;

      this.loading = false;
    });

    this.form = this.formBuilder.group({
      code: [ '', Validators.required ],
      client: [ '', Validators.required ],
      name: [ '', Validators.required ]
    });
  }

  onSubmit () {
    this.submitted = true;

    if (this.form.valid) {
      this.projectService.create(this.form.value).subscribe((project: Project) => {
        this.projects.push(project);

        this.form.reset();
        this.submitted = false;
      });
    }
  }

  onRemove (project: Project) {
    let snackBarRef = this.snackBar.info('Projet supprimé', 'Annuler'),
      undo = false;

    this.projects = this.projects.filter((item) => item._id !== project._id);

    snackBarRef.onAction().subscribe(() => undo = true);
    snackBarRef.afterDismissed().subscribe(() => {
      if (!undo) {
        this.projectService.remove(project._id).subscribe();
      } else {
        this.projects.push(project);
      }
    });
  }

}
