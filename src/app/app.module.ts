import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {BackendService} from './backend.service';
import {AuthService} from './auth/auth.service';
import {AuthInterceptor} from './auth.interceptor';
import {AppRoutesModule} from './app-routes.module';
import {AuthModule} from './auth/auth.module';
import {RecipeModule} from './recipe/recipe.module';
import {RecipeListModule} from './recipe-list/recipe-list.module';
import {AuthGuard} from './auth.guard';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutesModule,
    AuthModule,
    RecipeModule,
    RecipeListModule
  ],
  providers: [
    AuthService,
    BackendService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    AuthGuard
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
