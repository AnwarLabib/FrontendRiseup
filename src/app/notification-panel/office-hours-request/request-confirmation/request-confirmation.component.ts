import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-request-confirmation',
  templateUrl: './request-confirmation.component.html',
  styleUrls: ['./request-confirmation.component.css']
})
export class RequestConfirmationComponent {

  @Input() request;

  constructor() { }

}
