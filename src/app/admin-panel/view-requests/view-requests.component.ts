/*H

FILENAME: view-requests.component.ts

DESCRIPTION: This is the typescript file for the view-requests component,
             it includes methods for viewing, accepting and rejecting 
             expert requests (which is an action that can only be done 
             by an admin).

FUNCTIONS:  
           ngOnInit()
           onAccept(Request)
           onReject(Request)

AUTHORS: Amr Saadi & Mariz Samir.         START DATE: 3 Apr 2018.

H*/

import { Component, OnInit } from '@angular/core';
import { Request } from '../../shared/request.model';
import { DatabaseService } from "../../database.service";

@Component({
  selector: 'app-view-requests',
  templateUrl: './view-requests.component.html',
  styleUrls: ['./view-requests.component.css']
})

export class ViewRequestsComponent implements OnInit {

//this array is used to contain all expert requests, for them to be displayed.
requests : Request [];

//displayButtons:boolean = true; <- not needed and will be removed upon completion of this segment.

  constructor(public databaseService:DatabaseService) { }


/*ngOnInit(): on initializing the page, this method runs and calls the service "getExpertRequests()",
then proceeds to set the "requests" array to the array returned by the service containing 
all expert requests.*/
  ngOnInit() {
    this.requests = [];
    this.databaseService.getExpertRequests();
    this.databaseService.requestsSubject.subscribe((request)=>{
      console.log(request);
      this.requests = request;
    });
    

    /* Dummy data that was used for testing and will be removed upon the completion
    of this segment...

    
    console.log(this.requests.length);
     this.requests = [];

     var request = new Request();
 
     request = {
       user:{
         _id:"testWorks",
         fullName: "Amr Saadi"
       },
       description:"i am an expert irl",
       status:"unreviewed"
     }

     var request2 = new Request();
     request2 = {
       user:{
        _id:"testWorks",
         fullName: "Mariz Samir"
      },
       description:"i am an expert irl too",
       status:"unreviewed"
     }

     var request3 = new Request();
     request3 = {
       user:{
        _id:"testWorks",
         fullName: "Rony Labib"
       },
       description:"i made the website :)",
       status:"reviewed"
     }

     this.requests.push(request);
     this.requests.push(request2);
     this.requests.push(request3);


     */

  }


/*onAccept(): on clicking the accept button for a certain request, this method runs and that certain request gets passed to it,
it calls the service "acceptRequests(Request)", then proceeds to call the service getExpertRequests(), to set the requests array
to the updated one in the database.*/
  onAccept(request:Request){
    this.databaseService.acceptRequest(request);
    this.databaseService.getExpertRequests();
    this.databaseService.requestsSubject.subscribe((request)=>{
      this.requests = request;
    });
  }


/*onReject(): on clicking the reject button for a certain request, this method runs and that certain request gets passed to it,
it calls the service "rejectRequests(Request)", then proceeds to call the service getExpertRequests(), to set the requests array
to the updated one in the database.*/
  onReject(request:Request){
    this.databaseService.rejectRequest(request);
    this.databaseService.getExpertRequests();
    this.databaseService.requestsSubject.subscribe((request)=>{
      this.requests = request;
    });
  }



}


