import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/auth/auth.service';
import { NgForm } from '@angular/forms';
import { AppState } from 'src/app/store/reducers';
import { animationStandardEnterLeave } from 'src/app/shared/animations/animations';
import * as AuthActions from './../../../store/auth/auth.actions';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  animations: [animationStandardEnterLeave()],
})
export class SignInComponent implements OnInit {

  isLoginMode = false;
  isSignUpMode = false;
  isLoading: boolean;
  error: string;

  constructor(private router: Router, private store: Store<AppState>, private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.isTokenValid()) {
      setTimeout(() => this.router.navigate(['/home']), 10);
    }

    this.isLoading = false;

    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        this.isSignUpMode = event.url === '/signup';
      }
    });

    this.store.select(state => state.authState.isLoggedIn).subscribe(
      (isLoggedIn => {
        this.isLoginMode = !isLoggedIn;
      })
    );

    this.store.select(state => state.authState.isLoading).subscribe(
      isLoading => this.isLoading = isLoading
    );

    this.store.select(state => state.authState.errorMessage).subscribe(
      errorMessage => this.error = errorMessage
    );

    this.authService.autoLogin();
  }

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      return;
    }

    this.store.dispatch(AuthActions.signInRequest({ email: form.value.email, password: form.value.password }));
  }

  onSignOut(): void {
    this.store.dispatch(AuthActions.signOutReqeust());
  }

  onRouterLink(): void {
    this.store.dispatch(AuthActions.clearErrorMessage());
  }
}

