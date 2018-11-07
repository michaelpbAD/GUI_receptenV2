import { Component, OnInit } from '@angular/core';
import {Recipe} from '../recipeClasses/recipe';
import {BackendService} from '../backend.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  show = false; // indien dit op true en ik recipe/0 herlaat zal ik errors krijgen tot dat dataSubject.next is gedaan
  error = false;
  constructor(private backendService: BackendService) { }

  ngOnInit() {
    this.backendService.getRecipes().subscribe(
      (response: Recipe[]) => {
        // console.log(response);
        this.show = true;
      },
      (error) => {
        console.log(error);
        this.show = false;
        this.error = true;
      },
      () => console.log('get recipes done')
    );
  }

}
