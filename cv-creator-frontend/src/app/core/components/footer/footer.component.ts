import { Component, OnInit } from '@angular/core';
import { version } from './../../../../../package.json';
import { AuthService } from 'src/app/auth/auth.service.js';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  version: string;
  isLoggedIn = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.version = version;
    this.isLoggedIn = this.authService.isLoggedIn;
  }
}
