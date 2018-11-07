import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService {

  token: string;

  constructor(private router: Router) {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    }
  }

  signup(email: string, passwd: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, passwd)
      .then( () => {
        return true;
      })
      .catch(
        error => {
          console.log(error);
          return false;
        }
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

  emailCollision(control: FormControl): Promise<any> | Observable<any>{
    // const answer = new Promise<any>(((resolve, reject) => {
    // }))
    return firebase.auth().fetchProvidersForEmail(control.value)
      .then( () => {
        return{'emailCollision' : true};
      })
      .catch(
        error => {
          if (error === 'auth/invalid-email' ) {
            return null;
          }
          return{'emailCollision' : true};
        }
      );
  }

}
