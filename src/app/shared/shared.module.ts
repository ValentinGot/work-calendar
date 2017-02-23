import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MdSnackBarModule } from '@angular/material';

import { ImputationService } from './imputation/imputation.service';
import { ProjectService } from './project/project.service';
import { ProjectLocalService } from './project/project-local.service';
import { SnackbarService } from './snackbar.service';
import { ActivityService } from './activity/activity.service';

@NgModule({
  imports: [
    HttpModule,
    MdSnackBarModule.forRoot()
  ]
})
export class SharedModule {

  static forRoot (): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ImputationService,
        {
          provide: ProjectService,
          useClass: ProjectLocalService
        },
        ActivityService,
        SnackbarService
      ]
    }
  }

}
