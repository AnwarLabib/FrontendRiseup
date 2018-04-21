import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-expert-reject',
  templateUrl: './expert-reject.component.html',
  styleUrls: ['./expert-reject.component.css']
})
export class ExpertRejectComponent {

  @Input('request') request;
  @Input('isExpert') isExpert;

  constructor() { }
}
