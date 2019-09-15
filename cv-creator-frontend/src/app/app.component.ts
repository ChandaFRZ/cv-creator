import { Component, OnInit, ViewChild } from '@angular/core';

import { Store } from '@ngrx/store';
import { AuthService } from './auth/auth.service';
import { AppState } from './store/reducers';
import * as AuthActions from './store/auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('cookieLaw', { static: true })  cookieLawEl: any;
  cookieLawSeen: boolean;

  constructor(private authService: AuthService, private store: Store<AppState>) { }

  ngOnInit() {
    if (this.authService.isTokenValid()) {
      this.store.dispatch(AuthActions.signInWIthTokenRequest());
    }
  }

  dismiss(): void {
    this.cookieLawEl.dismiss();
  }
}
