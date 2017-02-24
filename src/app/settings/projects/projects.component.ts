import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ProjectService } from '../../shared/project/project.service';
import { Project } from '../../shared/project/project.model';
import { ProjectInterface } from '../../shared/project/project.interface';
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
    @Inject(ProjectService) private projectService: ProjectInterface,
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
      _id   : '',
      code  : [ '', Validators.required ],
      client: [ '', Validators.required ],
      name  : [ '', Validators.required ]
    });
  }

  protected create (project: Project) {
    this.projectService.create(project).subscribe((project: Project) => {
      this.projects.push(project);

      this.snackBar.success(`Le projet '${project.code} - ${project.name}' a été créé`);
    });
  }

  protected update (project: Project) {
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

  protected remove (project: Project) {
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
