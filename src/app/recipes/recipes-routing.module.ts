import { NgModule } from '@angular/core';
import {RecipeComponent} from './recipe/recipe.component';
import {RouterModule} from '@angular/router';
import {RecipeEditorComponent} from './recipe-editor/recipe-editor.component';
import {RecipeListComponent} from './recipe-list/recipe-list.component';
import {RecipesComponent} from './recipes.component';

const RecipesRoutes = [
  {path: 'recipe', component: RecipesComponent, children: [
      {path: 'list', component: RecipeListComponent},
      {path: ':id', component: RecipeComponent},
      {path: ':id/edit', component: RecipeEditorComponent},
    ]},
];

@NgModule({
  imports: [
    RouterModule.forChild(RecipesRoutes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class RecipesRoutingModule { }
