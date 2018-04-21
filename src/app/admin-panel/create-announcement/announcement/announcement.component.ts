/*H

FILENAME: app-announcement.component.ts

DESCRIPTION: This is the typescript file for the app-announcement component,
             it includes methods for deleting and viewing.

FUNCTIONS:  
           ngOnInit()
           onDelete(id, title, description)

AUTHORS:  Maggie Ezzat , peter agayby    START DATE: 3 Apr 2018.

H*/
import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import { Announcement } from '../../../shared/announcement.model';
import {DatabaseService} from "../../../database.service";

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {
   @Input() announcement: Announcement;
    // eventEmitter: EventEmitter<String>;
  constructor(private databaseservice: DatabaseService) { }

  ngOnInit() {
  }

  onDelete(id, title, description) {
   // this.eventEmitter.emit(id);
    this.databaseservice.deleteAnnouncement({_id: id, title: title, description: description});
  }

}
