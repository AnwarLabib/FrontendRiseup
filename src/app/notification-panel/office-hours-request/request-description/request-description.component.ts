import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-request-description',
  templateUrl: './request-description.component.html',
  styleUrls: ['./request-description.component.css']
})
export class RequestDescriptionComponent {
  @Input() request;

  constructor() { }
}
