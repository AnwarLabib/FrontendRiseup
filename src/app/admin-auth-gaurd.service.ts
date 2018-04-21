import { Injectable, Inject } from "@angular/core";
import { CanActivate } from '@angular/router';
import { DatabaseService } from './database.service';
@Injectable()
export class AdminAuthGaurd implements CanActivate{

    constructor(private databaseService:DatabaseService){

    }

    canActivate(){
        return this.databaseService.user.roles[0].includes("admin");
    }

}