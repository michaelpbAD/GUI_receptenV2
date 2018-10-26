import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RecipesRoutingModule} from './recipes-routing.module';
import {IngredientComponent} from './recipe/action/ingredient/ingredient.component';
import {RecipeComponent} from './recipe/recipe.component';
import {ActionComponent} from './recipe/action/action.component';
import {IngredientEditerComponent} from './recipe-editor/action-editer/ingredient-editer/ingredient-editer.component';
import {ActionEditerComponent} from './recipe-editor/action-editer/action-editer.component';
import {RecipeCardComponent} from './recipe-list/recipe-card/recipe-card.component';
import {RecipeListComponent} from './recipe-list/recipe-list.component';
import {RecipeEditorComponent} from './recipe-editor/recipe-editor.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RecipesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    RecipeComponent,
    ActionComponent,
    IngredientComponent,

    RecipeEditorComponent,
    ActionEditerComponent,
    IngredientEditerComponent,

    RecipeListComponent,
    RecipeCardComponent
  ]
})
export class RecipesModule { }
