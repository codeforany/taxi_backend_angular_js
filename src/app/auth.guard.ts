import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, retry } from 'rxjs';
import { Common } from './common';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const router: Router = inject(Router);
  var authToke = Common.accessToken;

  if (authToke != null && authToke != "") {
    return true;
  }else{
    router?.navigate(['/login'], {queryParams: {returnUrl: state.url}} );
    return false;
  }
};
