/*H

FILENAME: register.component.ts

DESCRIPTION: This is the typescript file for the register component,
             its contains method inorder to go through the registeration process

FUNCTIONS:
           ngOnInit()
           OnSubmit()

AUTHOR: Mohammed Hisham & Ahmed Gamal       START DATE: 3 Apr 2018.

H*/


import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms'
import { User } from '../shared/user.model'
import { DatabaseService} from '../database.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user:User;
  failed:boolean = false;
  failedBadEmail:boolean = false;
  startedTypingPassword: boolean = false;
  startedTypingCPassword: boolean = false;
  startedTypingName: boolean = false;

  //done this to avoid initial error when loading the page
  //the error is related to .length property
  nameModel = "";
  passwordModel = "";

  constructor(public database:DatabaseService,private router:Router) {
    // this.database.userSubject.subscribe((user)=>{
    //   if(user){
    //     this.router.navigate(['home']);
    //   }
    // })
  }

  /*onSubmit(): This method is called whenever the user submits the regesteration form and
  the user is registered and logged in through the database service*/
  onSubmit(f){
    this.user = {
      email:f.value.email,
      password:f.value.pass,
      profile:{
        fullName:f.value.name
      }
    }
    this.database.registerUser(this.user).subscribe(
      (response)=>{
        this.database.user = response.json().user;
        this.database.userSubject.next(this.database.user);
        this.router.navigate(['/home']);
      },(err)=>{
          this.failed = true;
      }
  )
  }


  //start typing name bardo e3mlha

  checkName(e){
    this.startedTypingName= true;
  }




  checkEmail(e){
    var re = /\S+@\S+\.\S+/; //regular expression, definition of Email
    if(!re.test(e)){   //check if it is valid email
      this.failedBadEmail = true;
      //console.log("here")
    }else{
      this.failedBadEmail = false;
    }
  }
  checkPassword(e){
    this.startedTypingPassword = true;
  }
  checkCPassword(e){
    this.startedTypingCPassword = true;
  }
}
