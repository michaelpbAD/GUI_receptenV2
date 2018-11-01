import { Component, OnInit } from '@angular/core';
import {Recipe} from '../recipeClasses/recipe';
import {BackendService} from '../backend.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  show = false;
  error = false;
  constructor(private backendService: BackendService) { }

  ngOnInit() {
    this.backendService.getRecipes().subscribe(
      (response: Recipe[]) => {
        console.log(response);
        this.show = true;
      },
      (error) => {
        console.log(error);
        this.show = true;
      },
      () => console.log('data collects')
    );
  }

}
