import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { AddImputation } from '../add-imputation/add-imputation.class';
import { AddImputationDialog } from '../add-imputation/add-imputation.dialog';
import { FormGroup, NgForm, FormBuilder, Validators } from '@angular/forms';
import { Activity } from '../../../shared/activity/activity.model';
import { ActivityService } from '../../../shared/activity/activity.service';
import * as moment from 'moment';

@Component({
  selector: 'wo-add-other-activity',
  templateUrl: './add-other-activity.component.html',
  styleUrls: ['./add-other-activity.component.scss']
})
export class AddOtherActivityComponent extends AddImputation implements OnInit {
  @Input() date: moment.Moment;
  @Input() dialogRef: MdDialogRef<AddImputationDialog>;

  activities: Activity[];
  form: FormGroup;
  submitted: boolean;

  @ViewChild('otherActivityForm') otherActivityForm: NgForm;

  constructor(
    private activityService: ActivityService,
    private formBuilder: FormBuilder
  ) { super(); }

  ngOnInit() {
    this.activityService.getAll().subscribe((activities) => this.activities = activities);

    this.form = this.formBuilder.group({
      activity: [ null, Validators.required ]
    });

    this.$onSubmit.subscribe(() => this.otherActivityForm.ngSubmit.emit());
  }

  onSubmit () {
    this.submitted = true;

    if (this.form.valid) {
      console.log(this.form.value);

      this.submitted = false;
    }
  }

}
