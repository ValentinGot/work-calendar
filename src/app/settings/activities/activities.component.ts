import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Activity } from '../../shared/activity/activity.model';
import { SettingsFormAbstract, FormMode } from '../settings-form.abstract';
import { SnackbarService } from '../../shared/snackbar.service';
import { ActivityService } from '../../shared/activity/activity.service';

@Component({
  selector: 'wo-settings-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent extends SettingsFormAbstract<Activity> implements OnInit {
  activities: Activity[];

  constructor(
    private activityService: ActivityService,
    private formBuilder: FormBuilder,
    private snackBar: SnackbarService
  ) { super(); }

  ngOnInit() {
    this.loading = true;
    this.switchMode(FormMode.CREATE);

    this.activityService.getAll().subscribe((activities) => {
      this.activities = activities;

      this.loading = false;
    });

    this.form = this.formBuilder.group({
      _id : '',
      name: [ '', Validators.required ]
    });
  }

  protected create (activity: Activity) {
    this.activityService.createOne(activity).subscribe((createdActivity: Activity) => {
      this.activities.push(createdActivity);

      this.snackBar.success(`L'activité '${createdActivity.name}' a été créé`);
    });
  }

  protected update (activity: Activity) {
    this.activityService.updateOne(activity._id, activity).subscribe((updatedActivity: Activity) => {
      this.activities = this.activities.map((item) => {
        if (item._id === updatedActivity._id) {
          item = updatedActivity;
        }

        return item;
      });

      this.snackBar.success(`L'activité '${updatedActivity.name}' a été modifié`);
    });
  }

  protected remove (activity: Activity) {
    const snackBarRef = this.snackBar.info('Activité supprimé', 'Annuler');
    let undo = false;

    this.activities = this.activities.filter((item) => item._id !== activity._id);

    snackBarRef.onAction().subscribe(() => undo = true);
    snackBarRef.afterDismissed().subscribe(() => {
      if (!undo) {
        this.activityService.removeOne(activity._id).subscribe();
      } else {
        this.activities.push(activity);
      }
    });
  }

}
