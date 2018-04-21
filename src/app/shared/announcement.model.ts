export class Announcement{
    _id?:String;
    title?:String;
    description?:String;

    constructor(title:String,description:String){
        this.title = title;
        this.description = description;
    }
}