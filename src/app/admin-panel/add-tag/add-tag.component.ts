/*H

FILENAME: add-tag.component.ts

DESCRIPTION: This is the typescript file for the add-tag component,
             it includes methods for viewing, adding, and deleting tags.

FUNCTIONS:  
           ngOnInit()
           addTag(tag)

AUTHORS:  Mariz Awad     START DATE: 3 Apr 2018.

H*/

import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from "@angular/http";
import { DatabaseService } from "../../database.service";
import { Tag } from "../../shared/tag.model";

@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.css']
})
export class AddTagComponent implements OnInit {

  tagsCount: number;
  newTag: string = "";
  tags: Tag[];

  constructor(public http:Http, public databaseService:DatabaseService) { }

  ngOnInit() {
    this.databaseService.getTags();
    this.databaseService.tagSubject.subscribe((tag)=>{
      this.tags = tag;
      this.tagsCount = this.tags.length;
    });
  }

  addTag(tag){
    this.databaseService.postTag({tag: tag});
    this.newTag = "";
    this.tagsCount = this.tags.length;
  }

}
