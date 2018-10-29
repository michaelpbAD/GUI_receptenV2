import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {BackendLinkData} from './backend-link-data';
import {BackendService} from './backend.service';
import {Recipe} from './recipeClasses/recipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private backendService: BackendService) {}
  ngOnInit() {
    firebase.initializeApp(BackendLinkData.config);

    this.backendService.getRecipes().subscribe(
      (response: Recipe[]) => {
        console.log(response);
        this.backendService.data = response;
      },
      (error) => {
        console.log(error);
        this.backendService.data = [];
      },
      () => console.log('data collects')
    );
  }
}
