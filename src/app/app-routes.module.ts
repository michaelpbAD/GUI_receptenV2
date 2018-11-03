import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {RecipeEditorComponent} from './recipes/recipe-editor/recipe-editor.component';
import {RecipeListComponent} from './recipes/recipe-list/recipe-list.component';
import {RecipesModule} from './recipes/recipes.module';
import {AuthGuard} from './auth.guard';

const appRoutes = [
    {path: '', redirectTo: '/recipe/list', pathMatch: 'full'},
    {path: 'recipe', loadChildren: './recipes/recipes.module#RecipesModule', canLoad: [AuthGuard]}
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutesModule { }
