import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('token'); // Replace 'your_token_key' with your actual token key
    if (token) {
      // If the token is present, navigate to the home page or any other route
      this.router.navigate(['/dashboard']); // Replace '/home' with the route you want to redirect to
      return false;
    }
    return true;
  }
}