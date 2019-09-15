import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AppState } from 'src/app/store/reducers';
import { animationStandardEnterLeave } from 'src/app/shared/animations/animations';
import * as AuthActions from './../../../store/auth/auth.actions';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  animations: [animationStandardEnterLeave()],
})
export class SignUpComponent implements OnInit {

  password = '';
  passwordConfirm = '';
  isLoading: boolean;
  error: string;

  constructor(private authService: AuthService, private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    if (this.authService.isTokenValid()) {
      setTimeout(() => this.router.navigate(['/home']), 10);
    }

    this.isLoading = false;

    this.store.select(state => state.authState.isLoading).subscribe(
      isLoading => this.isLoading = isLoading
    );

    this.store.select(state => state.authState.errorMessage).subscribe(
      errorMessage => this.error = errorMessage
    );
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      return;
    }

    this.store.dispatch(AuthActions.signUpRequest({ email: form.value.email, password: form.value.password }));
  }

  isPasswordValid(): boolean {
    return this.password === this.passwordConfirm;
  }

  onRouterLink(): void {
    this.store.dispatch(AuthActions.clearErrorMessage());
  }
}
