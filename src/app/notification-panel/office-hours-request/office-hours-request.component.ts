/*H

FILENAME: office-hours-request.component.ts

DESCRIPTION: This is the typescript file for the office-hours-request component,
             its main functionality is getting the chosen request from the URL and
             deciding which of its messages should be displayed.

FUNCTIONS:  
           ngOnInit()
           reviewDate()


AUTHOR: Anwar Labib        START DATE: 3 Apr 2018.

H*/

import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { ActivatedRoute,Params} from '@angular/router';
import { DatabaseService } from '../../database.service';
import { Response } from '@angular/http';

// Collections
import { OfficeHours } from '../../shared/officehours.model';

@Component({
  selector: 'app-office-hours-request',
  templateUrl: './office-hours-request.component.html',
  styleUrls: ['./office-hours-request.component.css']
})
export class OfficeHoursRequestComponent implements OnInit {

  request : OfficeHours;
  isExpert:boolean=false;

  /*On constructing the page, we initialize the component attributes like 'request' by getting
  the requestId from the URL and passing it to the database service to get the details of the
  request and setting the request attribute.*/ 
  constructor(private databaseService:DatabaseService, private route:ActivatedRoute) {
    this.isExpert = false;
    route.params.subscribe((params:Params)=>{
      var requestId = params['id'];
      // getOfficeHours is used to refresh the panel on the left
      this.databaseService.getOfficeHours();
      this.databaseService.getOfficeHour(requestId)
      .subscribe((response:Response)=>{
        this.request =response.json().officeHour;
        
        if(this.request && this.request.expert._id===this.databaseService.user._id){
          this.isExpert = true;
        }

      },(err)=>{
        console.log(err);
      }); 
    });
  }

  /*ngOnInit(): on initializing the page, this method sets the "request" attribute to the 
  officehours Request returned by the database service containing all office hours request.*/   

  ngOnInit() { 

    this.databaseService.officeHourSubject.subscribe((officeHour)=>{
      this.request = officeHour;
    });
  }

  /*reviewDate(): this method compares between the chosen date of the request and the current date
  to decide whether or not the feedback message from riseup should be displayed*/     
  reviewDate(){
    var current = new Date().getTime();
    var reviewTime = new Date(this.request.chosenSlot.slot).getTime();
    if(current>reviewTime-7200000){
      return true;
    }
    return false;
  }

  /*reviewDate(): this method compares checks whether the user/expert already reviewed
  this request to decide whether or not the feedback message from riseup should be displayed*/     
  isReviewed(){
    if(this.isExpert && this.request.isUserReviewed){
      return false;
    }
    if(!this.isExpert && this.request.isExpertReviewed){
      return false;
    }
    return true;
  }

}
