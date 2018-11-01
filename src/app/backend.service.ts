import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AuthService} from './auth/auth.service';
import {Recipe} from './recipeClasses/recipe';
import {map, catchError} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {BackendLinkData} from './backend-link-data';
import {Subject} from 'rxjs/Subject';
import {Router} from '@angular/router';

@Injectable()
export class BackendService {
  data: Recipe[] = [];
  editData: Recipe;
  dataSubject = new Subject();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) { }

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
          if (error.error['error'] === 'Auth token is expired') {
            this.authService.logout();
            this.router.navigate(['login' ]);
          }
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
