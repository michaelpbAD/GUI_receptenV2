import { NgModule } from '@angular/core';
import {RecipeComponent} from './recipe.component';
import {RouterModule} from '@angular/router';


const RecipeRoutes = [
  {path: 'recipe', component: RecipeComponent}
];
@NgModule({
  imports: [
    RouterModule.forChild(RecipeRoutes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class RecipeRoutingModule { }
