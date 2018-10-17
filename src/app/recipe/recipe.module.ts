import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActionComponent} from './action/action.component';
import {IngredientComponent} from './action/ingredient/ingredient.component';
import {RecipeComponent} from './recipe.component';
import {RecipeRoutingModule} from './recipe-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RecipeRoutingModule
  ],
  declarations: [
    RecipeComponent,
    ActionComponent,
    IngredientComponent
  ]
})
export class RecipeModule { }
