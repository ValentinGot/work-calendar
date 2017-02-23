import { EventEmitter } from '@angular/core';

export class AddImputation {
  $onSubmit: EventEmitter<boolean>;

  constructor () {
    this.$onSubmit = new EventEmitter<boolean>();
  }

}
