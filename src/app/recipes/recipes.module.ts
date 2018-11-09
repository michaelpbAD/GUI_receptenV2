import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RecipesRoutingModule} from './recipes-routing.module';
import {IngredientComponent} from './recipe/action/ingredient/ingredient.component';
import {RecipeComponent} from './recipe/recipe.component';
import {ActionComponent} from './recipe/action/action.component';
import {RecipeCardComponent} from './recipe-list/recipe-card/recipe-card.component';
import {RecipeListComponent} from './recipe-list/recipe-list.component';
import {RecipeEditorComponent} from './recipe-editor/recipe-editor.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RecipesComponent } from './recipes.component';
import { ActionCommentDirective } from './recipe/action-comment.directive';
import { UnitPipe } from './recipe/unit.pipe';
import { HighlightDirective } from './recipe/highlight.directive';
import { RecipeEditerComponent } from './recipe-editer/recipe-editer.component';
import {ActionEditerComponent} from './recipe-editer/action-editer/action-editer.component';

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

    ActionCommentDirective,
    UnitPipe,
    HighlightDirective,

    RecipeEditorComponent,

    RecipeListComponent,
    RecipeCardComponent,
    RecipesComponent,

    RecipeEditerComponent,
    ActionEditerComponent
  ],
  providers: [
  ],
})
export class RecipesModule { }
