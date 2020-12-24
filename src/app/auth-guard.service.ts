import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Router} from '@angular/router';
import { LoggerService } from './logger.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router, private loggerService: LoggerService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    return this.loggerService.isAuthenticated().then(
      (authenticated: boolean) => {
        if (authenticated)
        {
          return true;
        }
        else
        {
          this.router.navigate(['\login']);
          alert("Please Login");
        }
      }
    )
  }
}
