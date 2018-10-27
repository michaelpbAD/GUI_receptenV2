import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AuthService} from './auth/auth.service';
import {Recipe} from './recipeClasses/recipe';
import {map, catchError} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class BackendService {
  data: Recipe[];
  editData: Recipe;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getRecipes() {
    const url = 'https://httpclient-examples-8d1710.firebaseio.com/contactsL5.json';
    return this.http.get<Recipe[]>(url)
      .pipe(map(
        (response) => {
          return response;
        }
      ))
      .pipe((catchError(
        (error: HttpErrorResponse) => {
          console.log('ERROR: ', error);
          return Observable.throw('ERROR: getContact');
        }
      )));
  }

  storeRecipes(recipes: Recipe[]) {
    const url = 'https://httpclient-examples-8d1710.firebaseio.com/contactsL5.json';
    return this.http.put(url, recipes);
  }


}
