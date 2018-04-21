import { User } from "./user.model";

export class OfficeHours{
    _id?:String;
    createdOn?: Date;
    lastModified?: Date;
    notifyUser?:boolean;
    notifyExpert?:boolean;
    user?:{_id?:String, name?:String};
    expert?:{_id?:String, name?:String};
    suggestedSlots?:{
        slots?:[Date],
        createdOn?: Date
    };
    chosenSlot?:{
        slot: Date,
        createdOn: Date
    };
    title?:String;
    description?:String;
    status?:String;            //pending,accepted,rejected
    isExpertReviewed?:boolean;
    isUserReviewed?:boolean;
}