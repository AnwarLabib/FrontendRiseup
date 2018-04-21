import { Tag } from "./tag.model";

export class User {
    _id?: String;
    email?:String;
    password?:String;
    tokens?: tokenObject[];
    profile?:{
        fullName?:String;
        description?:String;
        interests?: String[];
        achievements?:String;
        expertIn?: String[];
        rating?:{
            rating?:number;
            count?:number;
        }
    }
    roles?:String[];
}

export interface tokenObject{
    access?:String;
    token?:String;
    _id?:String;
}