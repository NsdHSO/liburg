import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-footer-amount',
  templateUrl: './footer-amount.component.html',
  styleUrls: [ './footer-amount.component.scss' ]
})
export class FooterAmountComponent {

  @Input()
  amount: number = 0
  @Input()
  label: string = 'Not exists';
}
