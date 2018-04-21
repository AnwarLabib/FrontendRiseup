import { User } from "./user.model";

export class Review{
    _id?:String;
    reviewer?:{_id?:String, fullName?:String};
    reviewed?:{_id?:String, fullName?:String};
    officeHours?:String;
    description?:String;
    rating?:number;
}