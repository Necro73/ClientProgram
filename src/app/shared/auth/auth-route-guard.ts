import { Injectable } from '@angular/core';
import { AppSessionService } from '../session/app-session.service';

import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild
} from '@angular/router';
import {PermissionCheckerService} from "@shared/abp/services/auth/permission-checker.service";

@Injectable({
  providedIn: 'root'
})
export class AppRouteGuard implements CanActivate, CanActivateChild {

  constructor(
    private _permissionChecker: PermissionCheckerService,
    private _router: Router,
    private _sessionService: AppSessionService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this._sessionService.user) {
      console.log('[AppGuard] Redirect to login');
      this._router.navigateByUrl('/login', {skipLocationChange: true});
      return false;
    }

    if (!route.data || !route.data['permission']) {
      return true;
    }

    if (this._permissionChecker.isGranted(route.data['permission'])) {
      return true;
    }

    console.log('[AppGuard] Redirect to best route');
    this._router.navigate([this.selectBestRoute()], {skipLocationChange: true});
    return false;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  selectBestRoute(): string {
    if (!this._sessionService.user) {
      return '/login';
    }

    // if (this._permissionChecker.isGranted('Pages.Users')) {
    //   return '/app/admin/users';
    // }

    return '/chat';
  }
}
