/*H

FILENAME: create-announcement.component.ts

DESCRIPTION: This is the typescript file for the create-announcement component,
             it includes methods for creating announcements.

FUNCTIONS:  
           ngOnInit()
           onSubmit(title, description)

AUTHORS:  maggie ezzat , peter agayby     START DATE: 3 Apr 2018.

H*/

import { Component, OnInit } from '@angular/core';
import { Announcement } from '../../shared/announcement.model';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { DatabaseService } from '../../database.service';

@Component({
  selector: 'app-create-announcement',
  templateUrl: './create-announcement.component.html',
  styleUrls: ['./create-announcement.component.css']
})
export class CreateAnnouncementComponent implements OnInit {

  createAnnouncement: FormGroup;

  myAnnouncements: Announcement[];

  constructor(private formBuilder: FormBuilder,private databaseService:DatabaseService){
    this.createAnnouncement = this.formBuilder.group({
      title: ['', [<any>Validators.required]],
      description: ['', [<any>Validators.required]]
    });
  }

  ngOnInit() {

    this.databaseService.announcementSubject.subscribe((ann)=>{
      this.myAnnouncements = ann;
    });

    this.databaseService.getAnnouncements();
  }
  onSubmit(title, description) {
    this.databaseService.postAnnouncement({title: title.value, description: description.value});
    this.createAnnouncement.reset();
    
  }

}
