import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RecipeEditorRoutingModule} from './recipe-editor-routing.module';
import { ActionEditerComponent } from './action-editer/action-editer.component';
import { IngredientEditerComponent } from './action-editer/ingredient-editer/ingredient-editer.component';

@NgModule({
  imports: [
    CommonModule,
    RecipeEditorRoutingModule
  ],
  declarations: [RecipeEditorModule, ActionEditerComponent, IngredientEditerComponent]
})
export class RecipeEditorModule { }
