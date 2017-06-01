import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import * as moment from 'moment';

import { AddImputation } from '../add-imputation/add-imputation.class';
import { AddImputationDialog } from '../add-imputation/add-imputation.dialog';
import { FormGroup, NgForm, FormBuilder, Validators } from '@angular/forms';
import { Activity } from '../../../shared/activity/activity.model';
import { ActivityService } from '../../../shared/activity/activity.service';
import { ImputationService } from '../../../shared/imputation/imputation.service';
import { DayTime, Imputation, ImputationType } from '../../../shared/imputation/imputation.model';
import { SnackbarService } from '../../../shared/snackbar.service';

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
    private imputationService: ImputationService,
    private formBuilder: FormBuilder,
    private snackBar: SnackbarService
  ) { super(); }

  ngOnInit() {
    this.activityService.getAll().subscribe((activities) => this.activities = activities);

    this.form = this.formBuilder.group({
      activity: [ null, Validators.required ],
      am      : (new Date()).getHours() <= 12,
      pm      : (new Date()).getHours() > 12,
      comment : ''
    });

    this.$onSubmit.subscribe(() => this.otherActivityForm.ngSubmit.emit());
  }

  onSubmit () {
    this.submitted = true;

    if (this.form.valid) {
      let imputations: Imputation[] = [];

      if (this.form.value.am) {
        imputations.push(this.imputationService.make(this.date, DayTime.AM, ImputationType.ACTIVITY, this.form.value.activity, this.form.value.comment));
      }
      if (this.form.value.pm) {
        imputations.push(this.imputationService.make(this.date, DayTime.PM, ImputationType.ACTIVITY, this.form.value.activity, this.form.value.comment));
      }

      this.imputationService.create(...imputations).subscribe(
        (imputations) => {
          this.submitted = false;

          this.dialogRef.close(imputations)
        },
        (err) => this.snackBar.error(err));
    }
  }

}
