import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-user-choice-view',
  templateUrl: './user-choice-view.component.html',
  styleUrls: ['./user-choice-view.component.css']
})
export class UserChoiceViewComponent {

  @Input() request;

  constructor() { }
}
