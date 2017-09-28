// src/app/auth/auth.service.ts
import { error } from 'util';
import { provideForRootGuard } from '@angular/router/src/router_module';
import { cache } from 'awesome-typescript-loader/dist/cache';
import { throws } from 'assert';
import { throttle } from 'rxjs/operator/throttle';
import { JwtHelper} from 'angular2-jwt';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';
import Auth0Lock from "auth0-lock";

@Injectable()
export class AuthService {
    
    auth0 = new auth0.WebAuth({
    clientID: "5SJqcua0nXkZlJGAhE11m9pLzFpKfwzD",
    domain: "vega1.eu.auth0.com",
    responseType: "token",
    audience: "https://vega1.eu.auth0.com/userinfo",
    redirectUri: "http://localhost:5000/vehicles",
    scope: "openid"
  });

  private userRoles: string[] = []; 

  constructor(public router: Router) {}

  public login(): void {
    this.auth0.authorize();
  }

  public isInRole(name){
    return this.userRoles.indexOf(name) > -1;
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken) {
        window.location.hash = "";
        this.setSession(authResult);
        this.router.navigate(["/vehicles"]);
        this.auth0.client.userInfo(authResult.accessToken, function(err, user) {
          if(err)
            throw error;
          localStorage.setItem('profile', JSON.stringify(user));
        });   
      } else if (err) {
        this.router.navigate(["/vehicles"]);
        console.log(err);
      }});
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("token", authResult.idToken);
    this.setIdToken(authResult.idToken);  
    localStorage.setItem("expires_at", expiresAt);
  }

  private setIdToken(idToken){
    var jwtHelper = new JwtHelper();
    var decodedToken = jwtHelper.decodeToken(idToken);
    this.userRoles = decodedToken.roles;
    console.log("The roles are now: ", this.userRoles);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem("access_token");
    localStorage.removeItem("token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("profile");
    // Go back to the home route
    this.router.navigate(["/"]);
    this.userRoles = [];
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  }
}
