/*H

FILENAME: office-hours.component.ts

DESCRIPTION: This is the typescript file for the office-hours component,
             its main functionality is helping the user/expert to choose experts and send
             them an office hours request.

FUNCTIONS:
           ngOnInit()
           open()
           chooseExpert()
           removeExpert()
           selected()
           removed()
           refreshValue()
           itemsToString()
           searchForExpertsByTags()
           requestOfficeHours()
           cancel()
           isDisabled()

AUTHOR: Abdelrahman Ayman & Youssef Salah & Ahmed Morsy & Omar el moghazy & Badr

START DATE: 3 Apr 2018.

H*/

import { Component, OnInit, Input} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { User } from "./../shared/user.model";
import {DatabaseService} from "../database.service";
import {Tag} from "../shared/tag.model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import { Response } from '@angular/http';
@Component({
  selector: 'app-office-hours',
  templateUrl: './office-hours.component.html',
  styleUrls: ['./office-hours.component.css']
})
export class OfficeHoursComponent implements OnInit {

  searchTags=[];
  chosen=[];
  chosenTags=[];
  hasSearched = false;
  hasInterests = false;
  title;
  description;
  chosenExperts:User[];

  constructor(private databaseService:DatabaseService,private modalService: NgbModal) {
    this.hasInterests = (databaseService.user.profile.interests.length > 0) ? true : false;
  }

  /*ngOnInit(): on initializing the page, this method runs and initializes the page by
  setting the chosen experts to the suggested experts(related to tags in profile) and also they
  gett ALL the tags from the database so the user/expert can choose between them*/
  ngOnInit() {
    this.databaseService.getTags();
    this.searchForExpertsByTags();

    this.databaseService.expertsSubject.subscribe(
      experts=>{
        this.hasSearched = true;
        this.chosenExperts=experts;
      }
    )

    this.databaseService.tagSubject.subscribe((tags)=>{
      this.searchTags = [];
      for(let tag of tags){
        this.searchTags.push({'id':tag._id,'text':tag.tag});
      }
    });
  }

  /*open(): This method is called whenever the the user open a modal*/
  open(content) {
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }

  /*chooseExpert(): This method is called whenever the the user chooses an expert and he/she
  is added to the array of experts */
  chooseExpert(experts){
    this.chosen.push(experts);
    var index=this.chosenExperts.indexOf(experts,0);
    this.chosenExperts.splice(index,1);
    this.hasSearched = false;
  }

  /*chooseExpert(): This method is called whenever the the user removes an expert and he/she
  is removed to the array of experts */
  removeExpert(experts){
    var index=this.chosen.indexOf(experts,0);
    this.chosenExperts.push(experts);
    this.chosen.splice(index,1);
  }

  /* selected() & removed(): these are two method that must be present to the ng-select component*/
  selected(value:any):void {}
  removed(value:any):void {}

  /* refreshValue(): this method is the method that refreshes the array of chosen tags whenever
  they are added or deleted*/
  refreshValue(value:any):void {
    this.chosenTags = value;
  }

  /* refreshValue(): this method filters the text from the array*/
  itemsToString(value:string[]):string[] {
    return value
      .map((tag:any) => {
        return tag.text;
      });
  }

  /* searchForExpertsByTags(): this method is called whenever the user clicks on the search button
  and it passes the tags to the database through the database service*/
  searchForExpertsByTags(){
    this.chosen = [];
    this.databaseService.searchExperts(this.itemsToString(this.chosenTags))
    .subscribe((response:Response)=>{
      this.databaseService.expertsSubject.next(response.json().experts.slice());
    },(err)=>{
        console.log(err);
    });
  }

  /* requestOfficeHours(): this method is called whenever the user subm
  it the officehours request
  and it requests the office hours through the database service*/
  requestOfficeHours(){
    this.databaseService.requestOfficeHours1(this.title,this.description,this.chosen);
    this.chosen=[];
    this.title = '';
    this.description = '';
  }

  /* requestOfficeHours(): this method is called whenever the user cancels the officehours request
  and sets the the component attributes*/
  cancel(){
    this.title = '';
    this.description = '';
  }

  /* requestOfficeHours(): this method checks whether the user can submit the office hours request
  or not. He can submit if there is a description and a title*/
  isDisabled(){
    if(!this.title|| !this.description){
      return true;
    }
    return false;
  }
}
