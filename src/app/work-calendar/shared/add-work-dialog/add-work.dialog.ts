import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { ProjectService } from '../../../shared/project/project.service';
import { Project } from '../../../shared/project/project.model';
import { WorkType } from '../../../shared/work-type/work-type.model';

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

  selectedType: WorkType;
  selectedProject: number;
  selectedDayTime = {
    am: false,
    pm: false
  };

  constructor(
    private projectService: ProjectService,
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

    // Pre-select work type (default on 'Project')
    this.selectedType = this.workTypes[0];

    // Pre-select day time depending on the current hour
    if ((new Date()).getHours() <= 12) {
      this.selectedDayTime.am = true;
    } else {
      this.selectedDayTime.pm = true;
    }
  }

  onAdd () {
    console.log('ADD', this.selectedType, this.selectedProject);

    this.dialogRef.close();
  }

  capFirst (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

}
