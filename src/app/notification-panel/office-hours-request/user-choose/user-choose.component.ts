/*H

FILENAME: user-choose.component.ts

DESCRIPTION: This is the typescript file for the user-choose component,
             its main functionality is helping the user choose one of the suggested slots.

FUNCTIONS:  
           chooseSlot()

AUTHOR: Marwan Abdulgawad        START DATE: 3 Apr 2018.

H*/

import { Component, OnInit,Input } from '@angular/core';
import { DatabaseService } from '../../../database.service';
import { OfficeHours } from '../../../shared/officehours.model';

@Component({
  selector: 'app-user-choose',
  templateUrl: './user-choose.component.html',
  styleUrls: ['./user-choose.component.css']
})
export class UserChooseComponent {

  @Input() request;
  selectedSlot;
  isPicked=true;
  isWrongDate = false;

  constructor(private databaseService:DatabaseService) { }

  /*chooseSlot(): This method is called whenever the user submits his chosen slot.
  At first we have to check that the form is valid by checking that the user chose
  chose one date and is not an old date.Then the form is submitted through
  the database service*/
  chooseSlot(){
    var officeHours :OfficeHours = {
      _id : this.request._id,
      chosenSlot : {
        slot : new Date(this.selectedSlot),
        createdOn : new Date()
      },
    };
    if(this.selectedSlot)
    {
      var selectedDate = new Date(this.selectedSlot).getTime();
      var current = new Date().getTime();
      if(selectedDate - 7200000>current)
      {
        this.databaseService.userAcceptOfficeHours(officeHours);
      } else{
        this.isWrongDate = true;
      }
    } else{
      this.isPicked = false;
    }
  }

}
