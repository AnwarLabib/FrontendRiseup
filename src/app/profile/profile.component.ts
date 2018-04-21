/*H

FILENAME: profile.component.ts

DESCRIPTION: This is the typescript file for the profile component,
             its main functionalities are to display any user's profile(all info except for reviews ONLY for admin), to allow users to edit their own profiles,
             to allow admins to suspend experts, to allow users to apply for being experts, and allow the admin to view
             any user's reviews

FUNCTIONS:  
           open(content)
           ngOnInit()
           editName(name)
           editAchievement(achieve)
           onSubmit(f,content)
           editdescription(description)
           editInterests()
           editSkills()
           selected(value:any)
           removed(value:any)
           cancelInterests()
           cancelSkills()
           ExpertReq(description)
           suspend()
           viewReviews()
           BookOfficeHours(title,des)

AUTHOR: Abdelrahman Tarek & Mohamed Hesham & Mostafa Amer & Doaa Samer & Aya Waleed & Ahmed Gamal

START DATE: 3 Apr 2018.

H*/






import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from "./../shared/user.model";
import { Tag } from "./../shared/tag.model";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {DatabaseService } from "../database.service";
import { Response } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Request } from '../shared/request.model'
import { Review } from '../shared/review.model'
import { OfficeHours } from '../shared/officehours.model'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  allTags=[];
  initialTags = [];
  initialSkills = [];
  myTags=[];
  mySkills=[];
  incorrectPassword = false;
  displayedProfile: User;
  notMe:boolean;
  revs: Review [];
  isLoaded:Boolean = false;
  
  reqFailed:boolean = false;
  reqSuccess:boolean = false;
  reqResponseMsg:String;

  constructor(private modalService: NgbModal , public database : DatabaseService,private router:Router, private route:ActivatedRoute ) {  
    route.params.subscribe((params:Params)=>{
      var id = params['id'];
      if(id){
        this.notMe = true;
      }
      else{
        this.notMe = false;
      }
      if(this.notMe){
        
        this.database.getUser(id).subscribe((res:Response)=>{
          this.displayedProfile = res.json().user;
          if(this.database.user&&this.database.user.roles.includes('admin')){
            this.database.getReviews(this.displayedProfile);
          }
          this.isLoaded = true;
          this.myTags = this.displayedProfile.profile.interests.slice();
          if(this.displayedProfile.roles.includes("expert")){
            this.mySkills = this.displayedProfile.profile.expertIn.slice();
          }
        });
      }else{
        this.displayedProfile=this.database.user;
        this.myTags=this.database.user.profile.interests.slice();
        this.isLoaded = true;
        if(this.displayedProfile.roles.includes("expert")){
          this.mySkills=this.database.user.profile.expertIn.slice();
        }
      }
    });
    this.database.reviewsSubject.subscribe((revs)=>{
      this.revs = revs;
      console.log(revs);
    },(err)=>{
      console.log(err);
    });

  }

 // open(): A method that opens a given Modal according to which button is clicked
  
  open(content) {
    this.reqFailed=false;
    this.reqSuccess=false;
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }

  // ngOnInit(): sets initial values for the component by subscribing to subjects in the database service
  
  ngOnInit() {
    
    this.database.getTags();
      this.database.tagSubject.subscribe((tags)=>{
        this.initialTags = [];
        this.initialSkills = [];
        this.allTags = [];
        for(let tag of tags){
          this.allTags.push({'id':tag._id,'text':tag.tag});
        }
        for(let tag of tags){
          if(this.displayedProfile && this.displayedProfile.profile.interests.includes(tag.tag)){
            this.initialTags.push({'id':tag._id,'text':tag.tag});            
          }
          if(this.displayedProfile && this.displayedProfile.roles.includes("expert")){
            if(this.displayedProfile.profile.expertIn.includes(tag.tag)){
              this.initialSkills.push({'id':tag._id,'text':tag.tag});              
            }
          }
        }
      });
    this.database.userSubject.subscribe((u:User)=>{
      this.displayedProfile = u;
    });
  }

  // editName(): A method that edits the user's name  by calling the corresponding Method in the database service
  editName(name){
    var u : User;
    u = { profile : {
      fullName: name.value,
      }
    }
    this.database.editProfile(u);
  }

  // editAchievement(): A method that edits the user's achievements  by calling the corresponding Method in the database service
  editAchievement(achieve){
    var u : User;
    u= { 
        profile : {
         achievements:achieve.value,
      }
    }
    this.database.editProfile(u);
  }

  // onSubmit(): A method that edits the user's password  by calling the corresponding Method in the database service
  onSubmit(f,content){
    this.database.changePassword(f.value.opass,f.value.pass)
    .subscribe((response:Response)=>{
      // this.database.userSubject.next(response.json().data);
      this.database.logout();
      this.router.navigate(['/login']);
    },(err)=>{
      console.log(err);
      this.incorrectPassword = true;
      this.open(content);
    });
    
  }

  //editDescription(): A method that edits the user's description  by calling the corresponding Method in the database service
  editdescription(description){
    var u : User;
    u = { profile : {
      description:description.value
      }
    }
    this.database.editProfile(u);
  }

  //editInterests(): A method that edits the user's Interests  by calling the corresponding Method in the database service
  editInterests(){
    var u:User;
    u = {
      profile : {
        interests : this.myTags
      }
    }
    this.database.editProfile(u);
  }

  //editSkills(): A method that edits the user's Skills  by calling the corresponding Method in the database service

  editSkills(){
    console.log(this.mySkills);
    var u:User;
    u = {
      profile : {
        expertIn : this.mySkills
      }
    }
    this.database.editProfile(u);
  }

//selected(): a Method that selects Tags for a user however, without having a true effect on the Database
  selected(value:any):void {
    this.myTags.push(value.text);
    this.initialTags.push({'id':value.id,'text':value.text});            

    if(this.displayedProfile.roles.includes("expert")){
      this.mySkills.push(value.text);

      this.initialSkills.push({'id':value.id,'text':value.text});            
    }

  }

  //removed() : Removes Tags for the a user, however, without having a true effect in the Database 
  removed(value:any):void {
    var index = this.myTags.indexOf(value.text);
    this.myTags.splice(index,1);

    var index = this.initialTags.indexOf({'id':value.id,'text':value.text});
    this.initialTags.splice(index,1);

    if(this.displayedProfile.roles.includes("expert")){
      var index = this.mySkills.indexOf(value.text);
      this.mySkills.splice(index,1);

      var index = this.initialSkills.indexOf({'id':value.id,'text':value.text});
      this.initialSkills.splice(index,1);
    }

  }

  //cancelInterests() : a method that refreshes Interests to cancel an unwanted change made on them
  cancelInterests(){
    this.myTags=this.database.user.profile.interests.slice();
    this.database.getTags();
  }

  //cancelSkills(): a method that refreshes Skills to cancel an unwanted change made on them
  cancelSkills(){
    this.mySkills=this.database.user.profile.expertIn.slice();
    this.database.getTags();
  }

  //ExpertReq(): a method where the user can request to be an expert
  ExpertReq(description) {

    this.reqFailed = false;
    this.reqSuccess = false;

    var request = new Request();
    request.description =description.value;
    this.database.requestBeAnExpert(request)
      .subscribe((res: Response) => {

        this.reqFailed = false;
        this.reqSuccess = true;

        if(res && res.status && res.status == 200)
          this.reqResponseMsg = 'Your request to be considered an Expert has been recorded, and now starting a review process.';

      }, (err) => {

        this.reqFailed = true;
        this.reqSuccess = false;

        if(err && err.status && err.status == 400 && err.text())
          this.reqResponseMsg = err.text()+".";
          
      });

  }
  //suspend(): a method that suspends a user from being an expert
  suspend(){
    this.database.suspendExpert(this.displayedProfile)
    .subscribe((res:Response)=>{
      console.log(res.json().user);
      this.displayedProfile = res.json().updatedUser;
    },(err)=>{
        console.log(err);
    });
    // this.database.getUser(this.displayedProfile._id).subscribe(
    //   (response)=>{
    //     this.displayedProfile = response.json().user;
    //     //  this.router.navigate(['/','profile',this.displayedProfile._id]);
    //   }
    // );
  }

  ///viewReviews(): a method that gets all  reviews for the currently viewed user
  viewReviews(){
    if(this.database.user.roles.includes('admin')){
      this.database.getReviews(this.displayedProfile);
    }

  }

  //BookOfficeHours(): a method that sends an officeHours request using the corresponding method in the database Service

  BookOfficeHours(title,des){
    var officeHours= new OfficeHours();
    officeHours.title = title.value;
    officeHours.description = des.value;
    officeHours.expert = {_id:this.displayedProfile._id , name:this.displayedProfile.profile.fullName};
    this.database.requestOfficeHours(officeHours);
  }

}
