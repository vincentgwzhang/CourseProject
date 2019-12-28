import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;

  constructor(private _router: Router) { }

  signupUser(email: string, password: string) : void {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        message => {
          console.log(message);
        }
      )
      .catch(
        error => {
          console.log("Error code:" + error['code']);
          console.log("Error message:" + error['message']);
        }
      );
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(success => {
        firebase.auth().currentUser.getIdToken(true).then(
          (response: string) => {
            this.token = response;
            console.log("Login success");
            this._router.navigate(['/']);
          }
        );
      })
      .catch(ex => {
        console.log("Login fail");
        console.log(ex);
      });
  }

  getTocken() {
    firebase.auth().currentUser.getIdToken(true).then(
      (response: string) => {
        this.token = response;
      }
    );
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }

  logoutUser() {
    firebase.auth().signOut();
    this.token = null;
  }
}
