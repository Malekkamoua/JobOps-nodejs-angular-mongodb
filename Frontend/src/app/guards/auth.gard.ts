import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { ApiService } from './../services/api.service';

@Injectable()
export class AuthGard implements CanActivate {

    constructor(private myService: ApiService,
        private router: Router){}

    canActivate(){
        if (this.myService.loggedIn()) {
            console.log(this.myService.loggedIn())
            return true;
        }else{
            this.router.navigate(['/login']);
            return false;
        }
    }
}