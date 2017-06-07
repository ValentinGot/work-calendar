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
      $key : '',
      name: [ '', Validators.required ]
    });
  }

  protected create (activity: Activity) {
    this.activityService.create(activity).subscribe(() => {
      this.snackBar.success(`L'activité '${activity.name}' a été créé`);
    });
  }

  protected update (activity: Activity) {
    this.activityService.update(activity.$key, activity).subscribe(() => {
      this.snackBar.success(`L'activité '${activity.name}' a été modifié`);
    });
  }

  protected remove (activity: Activity) {
    const snackBarRef = this.snackBar.info('Activité supprimé', 'Annuler');
    let undo = false;

    this.activities = this.activities.filter((item) => item.$key !== activity.$key);

    snackBarRef.onAction().subscribe(() => undo = true);
    snackBarRef.afterDismissed().subscribe(() => {
      if (!undo) {
        this.activityService.remove(activity.$key).subscribe();
      } else {
        this.activities.push(activity);
      }
    });
  }

}
