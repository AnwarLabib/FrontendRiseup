import { Injectable, Inject } from "@angular/core";
import { CanActivate, Router } from '@angular/router';
import { DatabaseService } from './database.service';
@Injectable()
export class UserAuthGaurd implements CanActivate{

    constructor(private databaseService:DatabaseService,private router:Router){

    }

    canActivate(){
        if (this.databaseService.user && !this.databaseService.user.roles.includes("admin")){
            return true;
            
        }
        
        this.router.navigate(['/','home']);
        return false;
    }

}