import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from './services/auth.service';

const canActivate = [AuthService];

@Injectable({
  providedIn: 'root',
})
export class GrdGuard {
  constructor(private auth: AuthService, private rout: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.auth.isLoged.pipe(
      tap((isLoged) => {
        if (!isLoged) {
          const returnUrl = state.url;
          console.log('login');
          this.rout.navigate(['login'], { queryParams: { returnUrl } });
        } else {
          map((loggedIn) => (loggedIn ? true : false));
        }
      })
    );
  }
}
