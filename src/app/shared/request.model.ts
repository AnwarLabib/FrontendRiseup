import { User } from "./user.model";

export class Request{
    _id?:String;
    user?:{_id?:String, fullName?:String};
    description?:String;
    status?:String;
}