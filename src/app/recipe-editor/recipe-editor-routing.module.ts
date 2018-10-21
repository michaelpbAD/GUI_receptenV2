import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RecipeComponent} from '../recipe/recipe.component';
import {RecipeEditorComponent} from './recipe-editor.component';
import {RouterModule} from '@angular/router';

const RecipeEditorRoutes = [
  {path: 'recipeEditor', component: RecipeEditorComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(RecipeEditorRoutes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class RecipeEditorRoutingModule { }
