import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';


export interface  CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate,
                next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot,
                nextState?: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate();
  }
}
