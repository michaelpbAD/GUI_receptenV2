import { NgModule } from '@angular/core';
import {RecipeComponent} from './recipe/recipe.component';
import {RouterModule} from '@angular/router';
import {RecipeEditorComponent} from './recipe-editor/recipe-editor.component';
import {RecipeListComponent} from './recipe-list/recipe-list.component';

const RecipesRoutes = [
  {path: 'recipe', component: RecipeListComponent, children: [
      {path: ':id', component: RecipeComponent},
      {path: ':id/edit', component: RecipeEditorComponent},
    ]},
  {path: 'recipes', component: RecipeListComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(RecipesRoutes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class RecipesRoutingModule { }
