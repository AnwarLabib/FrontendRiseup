/*H

FILENAME: tag-view.component.ts

DESCRIPTION: This is the typescript file for the tag-view component,
             it includes methods for deleting and viewing tags.

FUNCTIONS:  
           ngOnInit()
           deleteTag(id, tag)

AUTHORS:       START DATE: 3 Apr 2018.

H*/


import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import { DatabaseService } from "../../../database.service";
import { Tag } from "../../../shared/tag.model";

@Component({
  selector: 'app-tag-view',
  templateUrl: './tag-view.component.html',
  styleUrls: ['./tag-view.component.css']
})
export class TagViewComponent implements OnInit {

  @Input() tag: Tag;
    // eventEmitter: EventEmitter<String>;
  constructor(private databaseservice: DatabaseService) { }

  ngOnInit() {
  }

  deleteTag(id, tag) {
    // this.eventEmitter.emit(id);
     this.databaseservice.deleteTag({_id: id, tag: tag});
   }

}
