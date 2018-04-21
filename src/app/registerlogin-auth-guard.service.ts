import { Injectable, Inject } from "@angular/core";
import { CanActivate, Router } from '@angular/router';
import { DatabaseService } from './database.service';
@Injectable()
export class RegisterLoginAuthGaurd implements CanActivate{

    constructor(private databaseService:DatabaseService, private router:Router){

    }

    canActivate(){
         if(this.databaseService.user){
             this.router.navigate(['home']);
             return false;
         }
         else{
             return true;
         }
    }

}