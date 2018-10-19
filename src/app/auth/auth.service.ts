import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  token: string;

  constructor(private router: Router) {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    }
  }

  signup(email: string, passwd: string) {
    firebase.auth().createUserWithEmailAndPassword(email, passwd)
      .catch(
        error => console.log(error)
      );
  }

  login(email: string, passwd: string) {
   return firebase.auth().signInWithEmailAndPassword(email, passwd)
      .then( () => {
        firebase.auth().currentUser.getIdToken()
          .then(
            (token: string) => {
              this.token = token;
              localStorage.setItem('token', token);
            }
        );
        return true;
      })
      .catch(
         error => {
           console.log(error);
          return false;
         }
      );
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
    .then(
      (token: string) => this.token = token
    );
    console.log(firebase.auth().currentUser.email);
    return this.token;
  }

  isLoggedIn() {
    return this.token != null;
  }

}
