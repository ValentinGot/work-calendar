import { NgModule, ModuleWithProviders } from '@angular/core';

import { EventService } from './event/event.service';
import { ProjectService } from './project/project.service';

@NgModule({})
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
        }
      ]
    }
  }

}
