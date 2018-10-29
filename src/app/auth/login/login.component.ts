import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invalidLogin: boolean;
  emailRule = /^.+@.+\.[a-zA-Z]{2,3}$/;

  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit() {
    this.invalidLogin = false;

    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required , Validators.email, this.validEmail.bind(this)]),
      'password': new FormControl(null, Validators.required)
    });
  }
  onLogin() {
    this.authService.login(this.loginForm.value.email,  this.loginForm.value.password)
      .then((response) => {
        if (!response) {
          this.invalidLogin = true;
        } else {
          this.invalidLogin = false;
          this.route.navigateByUrl('/recipe/list');
        }
      });
  }
  validEmail(control: FormControl): {[s: string]: boolean} {
    if (!this.emailRule.test(control.value)) {
      return{'invalidFormat' : true};
    }
    return null;
  }


}
