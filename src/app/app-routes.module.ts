import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {RecipeEditorComponent} from './recipes/recipe-editor/recipe-editor.component';

const appRoutes = [

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
