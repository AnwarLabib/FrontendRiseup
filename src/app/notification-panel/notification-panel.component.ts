/*H

FILENAME: notification-panel.component.ts

DESCRIPTION: This is the typescript file for the notification-panel component,
             its main functionality is getting all of the user's requests and
             displaying them.

FUNCTIONS:  
           ngOnInit()

AUTHOR: Anwar Labib        START DATE: 3 Apr 2018.

H*/

import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { OfficeHours } from '../shared/officehours.model';

@Component({
  selector: 'app-notification-panel',
  templateUrl: './notification-panel.component.html',
  styleUrls: ['./notification-panel.component.css']
})
export class NotificationPanelComponent implements OnInit {

  myRequests:OfficeHours[];

  constructor(private databaseService:DatabaseService) { }

  /*ngOnInit(): on initializing the page, this method runs and calls the Database Service by "getOfficeHours()",
  then proceeds to set the "myRequests" array to the array returned by the service containing 
  all office hours request.*/  
  ngOnInit() {

    this.databaseService.officeHoursSubject.subscribe((requests)=>{
      this.myRequests = requests;
    });

    this.databaseService.getOfficeHours();
  }

}
