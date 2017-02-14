import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { ProjectService } from '../../../shared/project/project.service';
import { Project } from '../../../shared/project/project.model';
import { WorkType } from '../../../shared/work-type/work-type.model';
import { EventService } from '../../../shared/event/event.service';
import { SnackbarService } from '../../../shared/snackbar.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Event } from '../../../shared/event/event.model';

@Component({
  selector: 'wo-add-work-dialog',
  templateUrl: './add-work.dialog.html',
  styleUrls: [ './add-work.dialog.scss' ]
})
export class AddWorkDialog implements OnInit {
  date: any;
  dateString: string;
  projects: Project[];
  workTypes: WorkType[];
  form: FormGroup;

  constructor(
    private projectService: ProjectService,
    private eventService: EventService,
    private snackbarService: SnackbarService,
    private formBuilder: FormBuilder,
    public dialogRef: MdDialogRef<AddWorkDialog>
  ) {}

  ngOnInit () {
    this.projectService.getAll().subscribe((projects) => this.projects = projects);

    this.dateString = `${this.capFirst(this.date.format('dddd'))} ${this.date.format('DD')} ${this.capFirst(this.date.format('MMMM'))}`;
    this.workTypes = [
      { id: 1, name: 'Projet' },
      { id: 2, name: 'Congé' },
      { id: 3, name: 'Arrêt maladie' }
    ];

    this.form = this.formBuilder.group({
      workType: this.workTypes[0],
      project: null,
      addProject: this.formBuilder.group({
        id: '',
        client: '',
        project: ''
      }),
      dayTime: ((new Date()).getHours() <= 12) ? 'am' : 'pm',
      comment: ''
    });
  }

  onSubmit (form) {
    if (this.isProject() && form.value.project === null) {
      this.snackbarService.error('Vous devez sélectionner un projet');
    } else {
      this.eventService.exists(this.date.format('YYYY-MM-DD'), form.value.dayTime).subscribe((exists) => {
        if (exists) {
          this.snackbarService.error('Une imputation est déjà remplie pour cette période');
        } else {
          let event: Event = {
            title: `${form.value.project.code} - ${form.value.project.name}`,
            start: `${this.date.format('YYYY-MM-DD')}T${form.value.dayTime === 'am' ? '09' : '14'}:00:00`,
            end: `${this.date.format('YYYY-MM-DD')}T${form.value.dayTime === 'am' ? '12' : '18'}:00:00`
          };

          this.eventService.post(event).subscribe(() => this.dialogRef.close(event));
        }
      });
    }
  }

  capFirst (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  isProject (): Boolean {
    return this.form.value.workType.id === 1;
  }

}
