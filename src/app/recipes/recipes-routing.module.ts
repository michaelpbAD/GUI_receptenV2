import { NgModule } from '@angular/core';
import {RecipeComponent} from './recipe/recipe.component';
import {RouterModule} from '@angular/router';
import {RecipeEditorComponent} from './recipe-editor/recipe-editor.component';
import {RecipeListComponent} from './recipe-list/recipe-list.component';
import {RecipesComponent} from './recipes.component';
import {AuthGuard} from '../auth.guard';
import {CanDeactivateGuard} from '../can-deactivate.guard';
import {RecipeEditerComponent} from './recipe-editer/recipe-editer.component';

const RecipesRoutes = [
  {path: '', component: RecipesComponent, canActivate: [AuthGuard], children: [
      {path: 'list', component: RecipeListComponent},
      {path: ':id', component: RecipeComponent},
      {path: ':id/edit', component: RecipeEditerComponent, canDeactivate: [CanDeactivateGuard]},
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
