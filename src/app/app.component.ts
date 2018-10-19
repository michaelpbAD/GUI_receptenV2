import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {BackendLinkData} from './backend-link-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    firebase.initializeApp(BackendLinkData.config);
  }
}
