/*H

FILENAME: home.component.ts

DESCRIPTION: This is the typescript file for the home component,
             it only holds information about rise up and the website, includes no typescript methods just HTML.
             The nested components are only holders for HTML components, nothing more than that as well.

FUNCTIONS:  

AUTHOR:      START DATE: 3 Apr 2018.

H*/


import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor() { }

}
