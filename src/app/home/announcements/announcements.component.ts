import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../../database.service';
import {Announcement} from '../../shared/announcement.model'
@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {
  myannouncement: Announcement[];
  constructor(private data:DatabaseService) { }

  ngOnInit() {
    this.data.getAnnouncements();
    this.data.announcementSubject.subscribe(
      Announcement =>{
        this.myannouncement=Announcement;
      }
    )
  }

}
