import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {BackendService} from '../../backend.service';
import {Recipe} from '../../recipeClasses/recipe';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  recipe: Recipe = new Recipe();
  _ID: number;
  delError = false;

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      (params: Params) => {
        this._ID = params.get('id');
        this.getRecipe();
      }
    );
  }

  getRecipe() {
    this.recipe = this.backendService.data[this._ID];
    this.backendService.dataSubject.subscribe(
      (recipes: Recipe[]) => {
      this.recipe = recipes[this._ID];
      }
    );
  }
  onEdit() {
    this.router.navigate(['recipe', this._ID, 'edit']);
  }
  onDel() {
    if (!this.delError) {
      this.backendService.data.splice(this._ID, 1);
    }
    this.backendService.storeRecipes(this.backendService.data).subscribe(
      (respons) => {
          console.log(respons);
          this.delError = false;
          this.router.navigate(['recipe', 'list']);
        },
          (error) => {
            console.log(error);
            this.delError = true;
          }
    );
  }
  get auth() {
    return this.authService;
  }

}
