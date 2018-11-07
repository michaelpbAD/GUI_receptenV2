import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  validPass = /.{6,}/;
  emailRule = /^.+@.+\.[a-zA-Z]{2,3}$/;
  singupError: boolean;
  loginError: boolean;

  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit() {
    this.singupError = false;
    this.loginError = false;
    this.signupForm = new FormGroup({
      'email': new FormControl(null,
        [Validators.required , Validators.email, this.validEmail.bind(this)],
          this.authService.emailCollision.bind(this)
      ),
      'password': new FormControl(null, [Validators.required, this.validPassword.bind(this)])
    });
  }
  validPassword(control: FormControl): {[s: string]: boolean} {
    if (!this.validPass.test(control.value)) {
      return{'invalidFormat' : true};
    }
    return null;
  }
  onSignup() {
    this.authService.signup(
      this.signupForm.value.email,
      this.signupForm.value.password
    ).then((responseS) => {
      if (!responseS) {
        this.singupError = true;
      } else {
        this.singupError = false;
        // login
        this.authService.login(this.signupForm.value.email,  this.signupForm.value.password)
          .then((responseL) => {
            if (!responseL) {
              this.loginError = true;
            } else {
              this.loginError = false;
              this.route.navigateByUrl('/recipeList');
            }
          });
      }
    });


  }
  validEmail(control: FormControl): {[s: string]: boolean} {
    if (!this.emailRule.test(control.value)) {
      return{'invalidFormat' : true};
    }
    return null;
  }
  get email() {
    return this.signupForm.get('email');
  }
  get password() {
    return this.signupForm.get('password');
  }


}
