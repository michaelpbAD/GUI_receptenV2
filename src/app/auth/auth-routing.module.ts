import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';

const authRoutes = [
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  declarations: [RouterModule]
})
export class AuthRoutingModule { }
