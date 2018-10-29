import { Component, OnInit } from '@angular/core';
import {Recipe} from '../recipeClasses/recipe';
import {BackendService} from '../backend.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  constructor(private backendService: BackendService) { }

  ngOnInit() {
    this.backendService.getRecipes().subscribe(
      (response: Recipe[]) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
        this.backendService.data = [];
      },
      () => console.log('data collects')
    );
  }

}
