/*H

FILENAME: login.component.ts

DESCRIPTION: This is the typescript file for the login component,
             its contains method inorder to go through the login process

FUNCTIONS:
           ngOnInit()
           OnSubmit()

AUTHOR: Amr Saadi & Abdelaziz       START DATE: 3 Apr 2018.

H*/

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,Validators} from "@angular/forms";
import {User} from "../shared/user.model"
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import { Response } from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User
  loginFailed:boolean
  errorMessage:string


constructor(private databaseService:DatabaseService, private router:Router) {

  // this.databaseService.userSubject.subscribe((user)=>{
  //   if(user){
  //     this.router.navigate(['home']);
  //   }
  // })
}

  /*ngOnInit(): On initializing the page, the component attributes are initialized*/
  ngOnInit() {
    this.user = new User();
    this.loginFailed = false;
    this.errorMessage = "";
  }

  /*onSubmit(): This method is called whenever the user submits the login form and
  the user is logged in through the database service*/
  OnSubmit(email:any, password:any){
    this.user.email = email;
    this.user.password = password;
    this.databaseService.login(this.user).subscribe(
      (response:Response)=>{
        this.databaseService.user = response.json().user;
        this.databaseService.userSubject.next(this.databaseService.user);

        if(this.databaseService.user.roles.includes('admin')){
          this.router.navigate(['/admin']);
        }else{
          this.router.navigate(['/home']);
        }

      },(err)=>{
        this.loginFailed = true;
        if(err.json().msg) {
          this.errorMessage = err.json().msg;
          if(this.errorMessage ==='email not found'){
            this.errorMessage = 'Email not found';
          } else if(this.errorMessage ==='password not correct'){
            this.errorMessage = 'Incorrect Password';
          }
        }
        else {
          this.errorMessage = 'Could not connect. Please check your internet connectivity';
        }
      }
    );
  }

}
