import { Component, Input } from '@angular/core';

@Component({
  selector: 'wo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent { }

export type HeaderContentPosition = 'left' | 'center' | 'right';

@Component({
  selector: 'wo-header-content',
  template: `<ng-content></ng-content>`
})
export class HeaderContentComponent {

  @Input() position: HeaderContentPosition = 'left';

}
