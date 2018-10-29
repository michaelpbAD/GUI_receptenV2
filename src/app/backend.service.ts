import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AuthService} from './auth/auth.service';
import {Recipe} from './recipeClasses/recipe';
import {map, catchError} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {BackendLinkData} from './backend-link-data';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class BackendService {
  data: Recipe[] = [];
  editData: Recipe;
  dataSubject = new Subject();

  constructor(private http: HttpClient, private authService: AuthService) { }

  getRecipes() {
    const url = BackendLinkData.url;
    return this.http.get<Recipe[]>(url)
      .pipe(map(
        (response) => {
          this.setData(response);
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
    const url = BackendLinkData.url;
    return this.http.put(url, recipes);
  }

  setData(recipes: Recipe[]) {
    this.data = recipes;
    this.dataSubject.next(recipes);
  }




}
