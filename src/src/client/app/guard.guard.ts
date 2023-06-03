import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { eOIDCFLOW, IdentityService } from './services/identity.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate /* ajm: , CanActivateChild, CanDeactivate<unknown>, CanLoad, CanMatch*/ {
  
  constructor(private identity: IdentityService, private router: Router) {
  }

  // ajm: -----------------------------------------------------------------------------------------
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.identity.accessToken) {
        return true;
      } else {
        this.identity.SetState(eOIDCFLOW.eSIGNINGIN);
        this.identity.AuthorizationCodeFlowPKCE();
        return false;
      }
  }
  
  // ajm: -----------------------------------------------------------------------------------------
  /* canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return true;
  }
  
  // ajm: -----------------------------------------------------------------------------------------
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return true;
  }
  
  // ajm: -----------------------------------------------------------------------------------------
  canMatch(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return true;
  }
  
  // ajm: -----------------------------------------------------------------------------------------
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return true;
  }*/
}
