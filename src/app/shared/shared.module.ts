import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MdSnackBarModule } from '@angular/material';

import { ImputationService } from './imputation/imputation.service';
import { ProjectService } from './project/project.service';
import { SnackbarService } from './snackbar.service';
import { ActivityService } from './activity/activity.service';

@NgModule({
  imports: [
    HttpModule,
    MdSnackBarModule
  ],
  providers: [
    ImputationService,
    ProjectService,
    ActivityService,
    SnackbarService
  ]
})
export class SharedModule {}
