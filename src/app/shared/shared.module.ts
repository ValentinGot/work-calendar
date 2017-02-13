import { NgModule, ModuleWithProviders } from '@angular/core';

import { ProjectService } from './project/project.service';

@NgModule({})
export class SharedModule {

  static forRoot (): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ProjectService
      ]
    }
  }

}
