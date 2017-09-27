// src/app/auth/auth.service.ts

import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import "rxjs/add/operator/filter";
import * as auth0 from "auth0-js";
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

  constructor(public router: Router) {}

  public login(): void {
    this.auth0.authorize();
  }

   public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      console.log("authResult", authResult);
      if (authResult && authResult.accessToken) {
        window.location.hash = "";
        this.setSession(authResult);
        this.router.navigate(["/vehicles"]);
      } else if (err) {
        this.router.navigate(["/vehicles"]);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    console.log("setting expires at to:", expiresAt)
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("token", authResult.idToken);
    localStorage.setItem("expires_at", expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem("access_token");
    localStorage.removeItem("token");
    localStorage.removeItem("expires_at");
    // Go back to the home route
    this.router.navigate(["/"]);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  }
}
