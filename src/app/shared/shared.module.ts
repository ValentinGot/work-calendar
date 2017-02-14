import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MdSnackBarModule } from '@angular/material';


import { EventService } from './event/event.service';
import { ProjectService } from './project/project.service';
import { SnackbarService } from './snackbar.service';

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
        {
          provide: EventService,
          useClass: EventService
        },
        {
          provide: ProjectService,
          useClass: ProjectService
        },
        SnackbarService
      ]
    }
  }

}
