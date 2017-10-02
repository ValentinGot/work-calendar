import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent, HeaderContentComponent } from './header/header.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    HeaderComponent,
    HeaderContentComponent
  ],
  exports: [
    HeaderComponent,
    HeaderContentComponent
  ]
})
export class LayoutModule { }
