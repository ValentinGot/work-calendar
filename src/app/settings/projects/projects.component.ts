import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ProjectService } from '../../shared/project/project.service';
import { Project } from '../../shared/project/project.model';
import { ProjectInterface } from '../../shared/project/project.interface';
import { SnackbarService } from '../../shared/snackbar.service';

enum FormMode { CREATE, UPDATE }

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
  buttonName: string;

  private mode: FormMode = FormMode.CREATE;

  constructor (
    @Inject(ProjectService) private projectService: ProjectInterface,
    private formBuilder: FormBuilder,
    private snackBar: SnackbarService
  ) { }

  ngOnInit () {
    this.loading = true;
    this.switchMode(FormMode.CREATE);

    this.projectService.getAll().subscribe((projects) => {
      this.projects = projects;

      this.loading = false;
    });

    this.form = this.formBuilder.group({
      _id   : '',
      code  : [ '', Validators.required ],
      client: [ '', Validators.required ],
      name  : [ '', Validators.required ]
    });
  }

  onEdit (project: Project) {
    this.switchMode(FormMode.UPDATE);

    this.form.setValue(project);
  }

  onSubmit () {
    this.submitted = true;

    if (this.form.valid) {
      switch (this.mode) {
        case FormMode.CREATE:
          delete this.form.value._id;

          this.create(this.form.value as Project);
          break;

        case FormMode.UPDATE:
          this.update(this.form.value as Project);
          break;
      }

      this.form.reset();
      this.submitted = false;
      this.switchMode(FormMode.CREATE);
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

  private create (project: Project) {
    this.projectService.create(project).subscribe((project: Project) => {
      this.projects.push(project);

      this.snackBar.success(`Le projet '${project.code} - ${project.name}' a été créé`);
    });
  }

  private update (project: Project) {
    this.projectService.update(project._id, project).subscribe((project: Project) => {
      this.projects = this.projects.map((item) => {
        if (item._id === project._id) {
          item = project;
        }

        return item;
      });

      this.snackBar.success(`Le projet '${project.code} - ${project.name}' a été modifié`);
    });
  }

  private switchMode (mode: FormMode) {
    switch(mode) {
      case FormMode.CREATE:
        this.mode = FormMode.CREATE;
        this.buttonName = 'Créer';
        break;

      case FormMode.UPDATE:
        this.mode = FormMode.UPDATE;
        this.buttonName = 'Modifier';
        break;
    }
  }

}
