import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import {RecipeListRoutingModule} from './recipe-list-routing.module';
import {RecipeListComponent} from './recipe-list.component';


@NgModule({
  imports: [
    CommonModule,
    RecipeListRoutingModule
  ],
  declarations: [RecipeListComponent, RecipeCardComponent]
})
export class RecipeListModule { }
