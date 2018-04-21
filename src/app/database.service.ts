
import {LOCAL_STORAGE, WebStorageService, SESSION_STORAGE} from 'angular-webstorage-service';
import { Subject } from "rxjs/Subject";
import { Http } from '@angular/http';
import { Request } from './shared/request.model';
import { Review } from './shared/review.model';
import { OfficeHours } from './shared/officehours.model';
import { Injectable, Inject } from "@angular/core";
import { Response } from "@angular/http";
import { User } from "./shared/user.model";
import { Headers } from "@angular/http";
import { Announcement } from "./shared/announcement.model";
import { Tag } from "./shared/tag.model";
import { Subscriber } from "rxjs/Subscriber";
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";
import { Router } from "@angular/router";

@Injectable()
export class DatabaseService{

    user : User;
    announcements : Announcement[];
    reviews : Review[];
    tags : Tag[];
    token : String;
    isLoggedIn: boolean = false;
    announcementSubject = new Subject<Announcement[]>();
    tagSubject = new Subject<Tag[]>();
    userSubject = new Subject<User>();

    requests : Request [];
    getUserSubject = new Subject<User>();
    usersSubject = new Subject<{_id:String,profile:{fullName:String}}[]>();
    expertsSubject = new Subject<User[]>();
    requestsSubject = new Subject<Request[]>();
    officeHoursSubject = new Subject<OfficeHours[]>();
    officeHourSubject = new Subject<OfficeHours>();
    reviewsSubject = new Subject<Review[]>();

    constructor(private http:Http, @Inject(SESSION_STORAGE) public storage: WebStorageService){

        this.userSubject.subscribe((user)=>{
            this.user = user;
            if(this.user && this.user.tokens)
                this.token = this.user.tokens[0].token;
            this.storage.set('user',this.user);
            if(user!=null && user!=undefined)
            {
                this.isLoggedIn=true;
            }
            else{
                this.isLoggedIn=false;
            }
        });
    }

    registerUser(user:User){
        return this.http.post('https://quiet-beyond-16034.herokuapp.com/register',{user});
    }

    login(user:User){
        if(!this.isLoggedIn)
        {
            return this.http.post('https://quiet-beyond-16034.herokuapp.com/login',{email : user.email, password : user.password})
        }
    }

    relog(){
        if(this.isLoggedIn){
            this.storage.remove('user');
            this.user = undefined;
            var headers = new Headers({'x-auth': this.token});
            this.http.get('https://quiet-beyond-16034.herokuapp.com/users/getByToken',{headers})
            .subscribe((res)=>{
                this.userSubject.next(res.json().user);
            },(err)=>{
                console.log(err);
            })
        }
    }

    logout(){
        var headers = new Headers({'x-auth': this.user.tokens[0].token});
        this.http.post('https://quiet-beyond-16034.herokuapp.com/logout',{},{headers}).subscribe((res)=>{
            this.user = null;
            this.storage.remove('user');
            this.userSubject.next(this.user);
        },(err)=>{
            console.log(err);
        });
    }

    getAnnouncements(){
        var headers = new Headers({'x-auth': this.token});
        this.http.get('https://quiet-beyond-16034.herokuapp.com/announcements', {headers : headers}).subscribe((response:Response)=>{
            this.announcements=response.json().announcements;
            this.announcementSubject.next(this.announcements.slice());
        },(err)=>{
            console.log(err);
        });
    }

    postAnnouncement(announcement:Announcement){
        var headers = new Headers({'x-auth': this.token});
        return this.http.post('https://quiet-beyond-16034.herokuapp.com/announcement',{announcement},{headers : headers})
        .subscribe((res:Response)=>{
            this.getAnnouncements();
        },(err)=>{
            console.log(err);
        });
    }

    deleteAnnouncement(announcement:Announcement){
        var headers = new Headers({'x-auth': this.token});
        this.http.delete('https://quiet-beyond-16034.herokuapp.com/announcement/'+announcement._id, {headers:headers}).
        subscribe((response:Response)=>{
            this.getAnnouncements();
        },(err)=>{
            console.log(err);
        });
    }

    postTag(tag:Tag){
        var headers = new Headers({'x-auth': this.token});
        this.http.post('https://quiet-beyond-16034.herokuapp.com/tag', {tag}, {headers:headers})
        .subscribe((response:Response)=>{
            this.getTags();
        },(err)=>{
            console.log(err);
        });
    }

    deleteTag(tag:Tag){
        var headers = new Headers({'x-auth': this.token});
        this.http.delete('https://quiet-beyond-16034.herokuapp.com/tag/'+tag._id, {headers:headers}).
        subscribe((response:Response)=>{
            this.getTags();
        },(err)=>{
            console.log(err);
        });
    }

    getTags(){
        //console.log(this.tags.length);
        var headers  = new Headers({'x-auth': this.token});
        this.http.get('https://quiet-beyond-16034.herokuapp.com/tags', {headers:headers}).
        subscribe((response:Response)=>{
            this.tags=response.json().tags;
            this.tagSubject.next(this.tags.slice());
            },(err)=>{
            console.log(err);
            }
        );

    }

    changePassword(oldPassword:String,newPassword:String){
        var headers  = new Headers({'x-auth': this.token});
        return this.http.post('https://quiet-beyond-16034.herokuapp.com/changePassword',
        {
            user:{oldPassword,newPassword}
        },{headers});
    }

    editProfile(user:User){
        var headers  = new Headers({'x-auth': this.token});
        return this.http.post('https://quiet-beyond-16034.herokuapp.com/editProfile',{user},{headers})
        .subscribe((response:Response)=>{
            this.userSubject.next(response.json().updatedUser);
        },(err)=>{
            console.log(err);
        });
    }

    //to search for a user by name or email, can be used for UserSearch
    //nexts the subject userObjects so make sure you subscribe to the subject to get the value
    searchUsers(searchText:String){
        var headers  = new Headers({'x-auth': this.token});
        this.http.post('https://quiet-beyond-16034.herokuapp.com/searchByName',{name:searchText},{headers})
        .subscribe((res)=>{
            this.usersSubject.next(res.json().result.slice());
        },(err)=>{
            console.log(err);
        });
    }

    //Name descriptive enough, nexts the getUserSubject
    getUser(userID:String){
        var headers  = new Headers({'x-auth': this.token});
        return this.http.get('https://quiet-beyond-16034.herokuapp.com/user/'+userID+'',{headers : headers});
    }


    //Name descriptive enough, nexts the expertsSubject
    searchExperts(tags:string[]){
        var headers = new Headers({'x-auth': this.token});
        return this.http.post('https://quiet-beyond-16034.herokuapp.com/searchExperts', {tags}, {headers:headers})
    }
    //get your office hours requests as user/expert (Office Hours Panel) (who requested) with their statuses, nexts the officeHoursSubject
    getOfficeHours(){
        var headers  = new Headers({'x-auth': this.token});
        this.http.get('https://quiet-beyond-16034.herokuapp.com/OfficeHours', {headers : headers}).subscribe((response:Response)=>{
        var officeHours =response.json().officeHours;
        this.officeHoursSubject.next(officeHours.slice());
        },(err)=>{
        console.log(err);
        });
    }

    getOfficeHour(id){
        var headers  = new Headers({'x-auth': this.token});
        return this.http.get(`https://quiet-beyond-16034.herokuapp.com/OfficeHour/${id}`,{headers : headers});
    }

    //Request to be an expert
    requestBeAnExpert(request:Request){
        var headers  = new Headers({'x-auth': this.token});
        return this.http.post('https://quiet-beyond-16034.herokuapp.com/request',
                {request: request},
                {headers: headers});
    }

    // Get be-an-expert requests (for Admins)
    // This method should be renamed to getExpertRequestForAdmin or something like that
    /*requestExpert(request:Request){
        var headers  = new Headers({'x-auth': this.token});
        return this.http.post('https://quiet-beyond-16034.herokuapp.com/request',{request:request},{headers : headers})
        .subscribe((res:Response)=>{
            if(this.user.roles.includes('admin'))
                this.getExpertRequests();
        },(err)=>{
            console.log(err);
        });    
    }*/

    //request office hours, object is filled with needed data
    requestOfficeHours1(title:String, description:String,experts:string[]){
      var headers = new Headers({'x-auth': this.token});
      return this.http.post('https://quiet-beyond-16034.herokuapp.com/officeHour', {experts,title,description}, {headers:headers})
        .subscribe((response:Response)=>{
        },(err)=>{
          console.log(err);
        });
    }

    requestOfficeHours(officeHours:OfficeHours){
        var expert = {
            _id: officeHours.expert._id,
            profile:{
                fullName:officeHours.expert.name
            }
        };
        var headers  = new Headers({'x-auth': this.token});
        return this.http.post('https://quiet-beyond-16034.herokuapp.com/officeHour',{
            experts: [expert],
            title: officeHours.title,
            description:officeHours.description
          } ,{headers})
        .subscribe((res:Response)=>{
        },(err)=>{
            console.log(err);
        });

    }

    // expert accepts office hours and sets the 3 timings in the office hours object passed
    expertAcceptsOfficeHours(officeHour: OfficeHours) {
        var headers  = new Headers({'x-auth': this.token});
        return this.http.post('https://quiet-beyond-16034.herokuapp.com/acceptOfficeHour/'+officeHour._id, {officeHour}, {headers : headers})
        .subscribe(
            (response: Response) => {
                this.officeHourSubject.next(response.json().officeHour);
                this.getOfficeHours();
            },(err)=>{
                console.log(err);
            });

    }

    // expert rejects office hours , The ID of the office hour is passed through API link
    expertRejectsOfficeHours(officeHours: OfficeHours) {
        var headers  = new Headers({'x-auth': this.token});
        return this.http.post('https://quiet-beyond-16034.herokuapp.com/rejectOfficeHour/' + officeHours._id, {}, {headers : headers})
        .subscribe((response: Response) => {
            this.officeHourSubject.next(response.json().officeHour);
            this.getOfficeHours();
            },(err)=>{
                console.log(err);
            });
    }

    //TODO: Hide from notifications or office hours panel (luxury),The ID of the office hour is passed through API link

    userHideOfficeHours(officeHours:OfficeHours){
        var headers  = new Headers({'x-auth': this.token});
    }

    expertHideOfficeHours(officeHours:OfficeHours){
        var headers  = new Headers({'x-auth': this.token});
    }

    //user does final acceptance stage of the office hours procedure
    userAcceptOfficeHours(officeHour:OfficeHours){
        var headers  = new Headers({'x-auth': this.token});
        this.http.post("https://quiet-beyond-16034.herokuapp.com/confirmOfficeHour/"+officeHour._id,{officeHour},{headers})
        .subscribe((response: Response) => {
            this.officeHourSubject.next(response.json().officeHour);
            this.getOfficeHours();
            },(err)=>{
                console.log(err);
            });
    }

    //gets the reviews of a certain user, only used by admin when admin views profiles
    getReviews(user:User){
        var headers  = new Headers({'x-auth': this.token});
        return this.http.get('https://quiet-beyond-16034.herokuapp.com/reviews/'+user._id+'', {headers : headers})
        .subscribe((response:Response)=>{
            this.reviews = response.json().reviews.slice()
            this.reviewsSubject.next(this.reviews);
            },(err)=>{
                console.log(err);
            }); 
    }

    sendReview(review){
        var headers  = new Headers({'x-auth': this.token});
        this.http.post("https://quiet-beyond-16034.herokuapp.com/review/"+review.officeHours,{review},{headers})
        .subscribe((response:Response)=>{
            this.getOfficeHour(response.json().review.officeHours)
            .subscribe((response:Response)=>{
                this.officeHourSubject.next(response.json().officeHour);
            })
        },(err)=>{
            console.log(err);
        });
    }


    //admin can suspend an expert while viewing his profile
    suspendExpert(user:User){
        var headers  = new Headers({'x-auth': this.token});
        return this.http.post('https://quiet-beyond-16034.herokuapp.com/suspendExpert/'+user._id+'',{},{headers : headers})
    }

    //gets all expert requests

    getExpertRequests(){
        var headers  = new Headers({'x-auth': this.token});
        this.http.get('https://quiet-beyond-16034.herokuapp.com/requests', {headers:headers}).
        subscribe((response:Response)=>{
            this.requests = response.json().requests;
            this.requestsSubject.next(this.requests.slice());
        },(err)=>{
            console.log(err);
        });
    }  

    //accept an expert request to make a user an expert, id passed through API link
    acceptRequest(request:Request){
        var headers  = new Headers({'x-auth': this.token});
        return this.http.post('https://quiet-beyond-16034.herokuapp.com/acceptRequest/'+request._id+'',{}
        ,{headers : headers}).subscribe((res:Response)=>{
            this.getExpertRequests();
        },(err)=>{
            console.log(err);
        });
    }
    


    //reject an expert request to make a user an expert, id passed through API link

    rejectRequest(request:Request){
        var headers  = new Headers({'x-auth': this.token});
        return this.http.post('https://quiet-beyond-16034.herokuapp.com/rejectRequest/'+request._id+'',{}
        ,{headers : headers}).subscribe((res:Response)=>{
            this.getExpertRequests();
        },(err)=>{
            console.log(err);
        });
    }



}
