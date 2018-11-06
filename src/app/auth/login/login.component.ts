import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {BackendService} from '../../backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invalidLogin: boolean;
  emailRule = /^.+@.+\.[a-zA-Z]{2,3}$/;

  constructor(
    private authService: AuthService,
    // private route: Router,
    private router: Router,
    private backendService: BackendService
  ) { }

  ngOnInit() {
    this.invalidLogin = false;

    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required ]),
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
          if (this.backendService.saved === false) {
            this.router.navigate(['recipe', this.backendService.editId, 'edit']);
          } else {
            // this.route.navigateByUrl('/recipe/list');
            this.router.navigate(['recipe', 'list']);
          }

        }
      });
  }
  onSignup() {
    // this.route.navigateByUrl('/signup');
    this.router.navigate(['signup', 'list']);
  }
  validEmail(control: FormControl): {[s: string]: boolean} {
    if (!this.emailRule.test(control.value)) {
      return{'invalidFormat' : true};
    }
    return null;
  }


}
