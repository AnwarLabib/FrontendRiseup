import { Component,Input } from '@angular/core';
import { OfficeHours } from '../../../shared/officehours.model';

@Component({
  selector: 'app-expert-suggestion-view',
  templateUrl: './expert-suggestion-view.component.html',
  styleUrls: ['./expert-suggestion-view.component.css']
})
export class ExpertSuggestionViewComponent {

  @Input() request;

  constructor() { }

}
