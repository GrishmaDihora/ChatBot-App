import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

	userLoggedIn = false;
	constructor() {}

	canActivate() {
    	if (this.userLoggedIn) {
      		return true;
    	} else {
      		return false;
    	}
  	}
}