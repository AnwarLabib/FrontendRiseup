/*H

FILENAME: expert-suggest.component.ts

DESCRIPTION: This is the typescript file for the expert-suggest component,
             its main functionality is helping the expert choose his/her 
             suggested slots.

FUNCTIONS:  
           ngOnChanges()
           addDate2()
           addDate3()
           removeDate2()
           removeDate3()
           onSubmit()
           reject()


AUTHOR: Maggie Ezzat        START DATE: 3 Apr 2018.

H*/

import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {DatabaseService} from '../../../database.service';
import { OfficeHours } from '../../../shared/officehours.model';
@Component({
  selector: 'app-expert-suggest',
  templateUrl: './expert-suggest.component.html',
  styleUrls: ['./expert-suggest.component.css']
})
export class ExpertSuggestComponent implements OnChanges {

  @Input() request;
  isPickedOne = true;
  isWrongDate;

  ngForm: FormGroup;

  isDate2: boolean;
  isDate3: boolean;

  constructor(private formBuilder: FormBuilder, private databaseService: DatabaseService) {
    this.ngForm = this.formBuilder.group({
      date1: ['', [<any>Validators.required]],
      date2: ['', ],
      date3: ['', ],
    } );
  }

  /*ngOnChanges: this method in our case is triggered when the expert chooses another
  request from the panel on the left so we have to reset the form and the component attributes.*/ 
  ngOnChanges() {
    this.isPickedOne = true;
    this.isWrongDate = false;
    this.isDate2 = false;
    this.isDate3 = false;
    this.ngForm.get('date1').setValue('');
    this.ngForm.get('date2').setValue('');
    this.ngForm.get('date3').setValue('');
  }
  /*addDate2(): This method is used to make the second date input viewable */
  addDate2() {
    this.isDate2 = true;
  }
  /*addDate2(): This method is used to make the third date input viewable */
  addDate3() {
    this.isDate3 = true;
  }
  /*addDate2(): This method is used to make the second date input not viewable */
  removeDate2() {
    this.isDate2 = false;
    this.ngForm.get('date2').setValue('');
  }
  /*addDate2(): This method is used to make the third date input not viewable */
  removeDate3() {
    this.isDate3 = false;
    this.ngForm.get('date3').setValue('');
  }

  /*onSubmit(): This method is called whenever the expert submits his suggested slots.
  At first we have to check that the form is valid by checking that the expert chose
  atleast one date and neither of them is an old date.Then the form is submitted through
  the database service*/
  onSubmit() {

    var dates = [] ;
    this.isPickedOne = false;

    if ( this.ngForm.get('date1').value !== '') {
      dates.push(this.ngForm.get('date1').value);
      this.isPickedOne = true;
    }

    if ( this.ngForm.get('date2').value !== '') {
      dates.push(this.ngForm.get('date2').value);
      this.isPickedOne = true;
    }

    if ( this.ngForm.get('date3').value !== '') {
      dates.push(this.ngForm.get('date3').value);
      this.isPickedOne = true;
    }
    
    this.isWrongDate = false;

    for (let date of dates) {
      var pickedDate = new Date(date).getTime();
      var currentDate = new Date().getTime();
      if(currentDate>pickedDate){
        this.isWrongDate = true;
      }

    }
  
    
    var req = {
      _id : this.request._id,
      suggestedSlots : this.request.suggestedSlots
    }

    req.suggestedSlots = {
      slots : dates ,
       createdOn: new Date(Date.now())
    };

    if(this.isPickedOne&&!this.isWrongDate){
      this.databaseService.expertAcceptsOfficeHours(req);
    }
  }
  /*reject(): This method is called whenever the expert rejects the request.
  The request is rejected through the database service*/
  reject() {
    var req = this.request;
    this.databaseService.expertRejectsOfficeHours(req);
  }

}
