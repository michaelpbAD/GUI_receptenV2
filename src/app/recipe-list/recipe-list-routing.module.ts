import { NgModule } from '@angular/core';
import {RecipeListComponent} from './recipe-list.component';
import {RouterModule} from '@angular/router';

const RecipeListRoutes = [
  {path: 'recipeList', component: RecipeListComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(RecipeListRoutes)
  ],
  declarations: [RouterModule]
})
export class RecipeListRoutingModule { }
