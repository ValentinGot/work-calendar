import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ProjectService } from '../../shared/project/project.service';
import { Project } from '../../shared/project/project.model';
import { SnackbarService } from '../../shared/snackbar.service';
import { SettingsFormAbstract, FormMode } from '../settings-form.abstract';

@Component({
  selector: 'wo-settings-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent extends SettingsFormAbstract<Project> implements OnInit {
  projects: Project[];

  constructor (
    private projectService: ProjectService,
    private formBuilder: FormBuilder,
    private snackBar: SnackbarService
  ) { super(); }

  ngOnInit () {
    this.loading = true;
    this.switchMode(FormMode.CREATE);

    this.projectService.getAll().subscribe((projects) => {
      this.projects = projects;

      this.loading = false;
    });

    this.form = this.formBuilder.group({
      $key  : '',
      code  : [ '', Validators.required ],
      client: [ '', Validators.required ],
      name  : [ '', Validators.required ]
    });
  }

  protected create (project: Project) {
    this.projectService.create(project).subscribe(() => {
      this.snackBar.success(`Le projet '${project.code} - ${project.name}' a été créé`);
    });
  }

  protected update (project: Project) {
    this.projectService.update(project.$key, project).subscribe(() => {
      this.snackBar.success(`Le projet '${project.code} - ${project.name}' a été modifié`);
    });
  }

  protected remove (project: Project) {
    const snackBarRef = this.snackBar.info('Projet supprimé', 'Annuler');
    let undo = false;

    this.projects = this.projects.filter((item) => item.$key !== project.$key);

    snackBarRef.onAction().subscribe(() => undo = true);
    snackBarRef.afterDismissed().subscribe(() => {
      if (!undo) {
        this.projectService.remove(project.$key).subscribe();
      } else {
        this.projects.push(project);
      }
    });
  }

}
