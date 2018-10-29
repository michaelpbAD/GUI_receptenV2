import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {RecipeEditorComponent} from './recipes/recipe-editor/recipe-editor.component';
import {RecipeListComponent} from './recipes/recipe-list/recipe-list.component';

const appRoutes = [
    {path: '', redirectTo: '/recipe/list', pathMatch: 'full'}
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
