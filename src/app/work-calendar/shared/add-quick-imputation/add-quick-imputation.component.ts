import { Component, OnInit, Inject, EventEmitter, ViewChild, Input } from '@angular/core';
import { FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
import { MdDialogRef } from '@angular/material';

import { ProjectInterface } from '../../../shared/project/project.interface';
import { ProjectService } from '../../../shared/project/project.service';
import { Project } from '../../../shared/project/project.model';
import { EventService } from '../../../shared/event/event.service';
import { Event, DayTime } from '../../../shared/event/event.model';
import { AddImputationDialog } from '../add-imputation/add-imputation.dialog';

@Component({
  selector: 'wo-add-quick-imputation',
  templateUrl: './add-quick-imputation.component.html',
  styleUrls: ['./add-quick-imputation.component.scss']
})
export class AddQuickImputationComponent implements OnInit {
  @Input() date: any;
  @Input() dialogRef: MdDialogRef<AddImputationDialog>;

  form: FormGroup;
  projects: Project[];
  submitted: boolean;

  @ViewChild('quickImputationForm') quickImputationForm: NgForm;

  $onSubmit: EventEmitter<boolean>;

  constructor(
    @Inject(ProjectService) private projectService: ProjectInterface,
    private eventService: EventService,
    private formBuilder: FormBuilder
  ) {
    this.$onSubmit = new EventEmitter<boolean>();
  }

  ngOnInit() {
    this.projectService.getAll().subscribe((projects) => this.projects = projects);

    this.form = this.formBuilder.group({
      project: [ null, Validators.required ],
      am     : (new Date()).getHours() <= 12,
      pm     : (new Date()).getHours() > 12,
      comment: ''
    });

    this.$onSubmit.subscribe(() => this.quickImputationForm.ngSubmit.emit());
  }

  onSubmit () {
    this.submitted = true;

    if (this.form.valid && (this.form.value.am || this.form.value.pm)) {
      let events: Event[] = [];

      if (this.form.value.am) {
        events.push(this.eventService.make(this.date, DayTime.AM, this.form.value.project as Project, this.form.value.comment));
      }
      if (this.form.value.pm) {
        events.push(this.eventService.make(this.date, DayTime.PM, this.form.value.project as Project, this.form.value.comment));
      }

      this.submitted = false;

      this.eventService.create(...events).subscribe((events) => this.dialogRef.close(events));
    }
  }

}
