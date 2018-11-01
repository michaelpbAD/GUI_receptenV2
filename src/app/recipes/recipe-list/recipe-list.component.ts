import { Component, OnInit } from '@angular/core';
import {BackendService} from '../../backend.service';
import {Recipe} from '../../recipeClasses/recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  data: Recipe[] = [];
  constructor(private backendService: BackendService) { }
  ngOnInit() {
    this.data = this.backendService.data;
    this.backendService.dataSubject.subscribe(
       (recipes: Recipe[]) => {
         this.data = recipes;
       },
      (error) => console.log(error),
      () => console.log('Klaar!')
     );
  }

}
