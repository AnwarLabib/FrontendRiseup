/*H

FILENAME: give-feedback.component.ts

DESCRIPTION: This is the typescript file for the give-feedback component,
             its main functionality is helping the expert/user give feedback.

FUNCTIONS:  
           ngOnInit()
           ngOnChanges()
           onHoverRatingChange(event)
           ratingChange(event)
           onClickRatingChange(event)
           sendReview()

AUTHOR: Anwar Labib        START DATE: 3 Apr 2018.

H*/

import { Component, OnInit,Input,AfterViewChecked,OnChanges } from '@angular/core';
import { DatabaseService } from '../../../database.service';
import { OfficeHours } from '../../../shared/officehours.model';

@Component({
  selector: 'app-give-feedback',
  templateUrl: './give-feedback.component.html',
  styleUrls: ['./give-feedback.component.css']
})
export class GiveFeedbackComponent implements OnInit,OnChanges {

  @Input() request:OfficeHours;
  text:String;
  rating:number;
  viewTextArea;
  desc="";
  constructor(private databaseService:DatabaseService) { }

  /*ngOnInit(): on initializing the page, the rating is initialized with zero*/ 

  ngOnInit() {
    this.rating =0;
  }

  /*ngOnChanges: this method in our case is triggered when the user/expert chooses another
  request from the panel on the left so we have to reset the feedback form.*/ 
  ngOnChanges(){
    this.text = "";
    this.rating =0;
    this.viewTextArea = false;
  }

  /*onHoverRatingChange: this method is triggered when the user/expert hovers over the stars
  and calls the ratingChange method to change the text.*/ 
  onHoverRatingChange(event){
    if(event.hoverRating!==0){
      this.ratingChange(event.hoverRating);
    } else{
      if(this.rating==0){
        this.text = "";
      } else{
        this.ratingChange(this.rating)
      }
    }
  }

  /*ratingChange: this method is used as a helper method to onHoverRatingChange which
  changes the text depending on the rating.*/ 
  ratingChange(event){
    if(event==1){
      this.text = 'Very Bad';
    } else if(event==2){
      this.text = 'Bad';
    } else if(event==3){
      this.text = 'Good';
    } else if(event==4){
      this.text = 'Very Good';
    } else if(event==5){
      this.text = 'Excellent';
    }
  }

  /*ratingChange: this method is triggered when the user/expert chooses the rating(stars)
  and it sets the chosen rating and makes the text area viewable*/ 
  onClickRatingChange(event){
    this.rating = event.rating;
    this.viewTextArea = true;
  }

  /*sendReview: this method is triggered when the user/expert submits the feedback form and
  it is submitted through the database service */   
  sendReview(){
    var review = {
      rating : this.rating,
      description : this.desc,
      officeHours : this.request._id
    };    
    this.databaseService.sendReview(review);
  }

}
