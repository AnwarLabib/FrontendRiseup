import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { DatabaseService } from './database.service';
import { User } from './shared/user.model';
import { Router } from '@angular/router';
import { WebStorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import { SelectComponent } from 'ng2-select';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  user:User;
  searchUsers : {'id':String,'text':String}[];
  @ViewChild('chosenUser') ngSelect:SelectComponent;
  disabled: boolean = false;

  constructor(private databaseService:DatabaseService,public router:Router){
    this.databaseService.usersSubject.subscribe(
      (users)=>{
        this.searchUsers = [];
        for(let user of users){
          this.searchUsers.push({'id':user._id,'text':user.profile.fullName});
        }
      }),(err)=>{
        console.log(err);
      }
  }

  ngOnInit(): void {
    if(this.databaseService.storage.get('user')){
      this.databaseService.userSubject.next(this.databaseService.storage.get('user'));
      this.databaseService.relog();
    }

    this.databaseService.userSubject.subscribe((u:User)=>{
      this.user = u;
    });    

  }

  onSearch(event){
    this.databaseService.searchUsers(event);
  }

  selected(event){
    this.searchUsers = [];
    this.router.navigate(['/','profile',event.id]);
    this.ngSelect.remove(event);
  }
  
  logout(){
    this.databaseService.logout();
  }
}
