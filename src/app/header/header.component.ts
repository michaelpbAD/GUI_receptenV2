import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  onLogout() {
    this.authService.logout();
  }
  get auth() {
    return this.authService;
  }
  onNewRecipe() {
    this.router.navigate(['recipe', -1, 'edit' ]);
  }

}
