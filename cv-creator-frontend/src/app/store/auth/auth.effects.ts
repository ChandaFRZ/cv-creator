import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { concatMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router,
        private sharedServce: SharedService
    ) { }

    signInRequest$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.signInRequest),
        concatMap(action =>
            this.authService.signIn({ email: action.email, password: action.password })
                .pipe(
                    map(data => {
                        this.authService.setTokenInLocalStorage(data.token);
                        this.sharedServce.openSnackBar({ message: 'Sign-In successfull!', action: 'Auth' });
                        this.router.navigate(['/home']);
                        return AuthActions.signInSuccess({ user: data.user, token: data.token });
                    }),
                    catchError((error: string) => {
                        console.warn(error);
                        this.sharedServce.openSnackBar({ message: error, action: 'Auth' });
                        return of(AuthActions.signInFailure({ errorMessage: error }));
                    }))))
    );

    signInWithTokenRequest$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.signInWIthTokenRequest),
        concatMap(() =>
            this.authService.loginWithToken()
                .pipe(
                    map(data => {
                        return AuthActions.signInWithTokenSuccess({ user: data.user, token: data.token });
                    }),
                    catchError((error: string) => {
                        console.warn(error);
                        return of(AuthActions.signInWithTokenFailure({ errorMessage: error }));
                    }))))
    );

    signUpRequest$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.signUpRequest),
        concatMap(action =>
            this.authService.signUp({ email: action.email, password: action.password })
                .pipe(
                    map(data => {
                        this.router.navigate(['/signin']);
                        return AuthActions.signUpSuccess({ user: null });
                    }),
                    catchError((error: string) => {
                        console.warn(error);
                        return of(AuthActions.signUpFailure({ errorMessage: error }));
                    }))))
    );

    signOutRequest$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.signOutReqeust),
        concatMap(() =>
            this.authService.signOut()
                .pipe(
                    map(() => {
                        this.router.navigate(['/signin']);
                        this.authService.signOut();
                        return AuthActions.signOutSuccess();
                    }),
                    catchError((error: string) => {
                        console.warn(error);
                        return of(AuthActions.signInFailure({ errorMessage: error }));
                    }))))
    );

    updatePageTitleRequest$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.updatePageTitleRequest),
        concatMap(action =>
            this.authService.updatePublicPageTitle({ pageTitle: action.pageTitle })
                .pipe(
                    map(data => AuthActions.updatePageTitleSuccess({ user: data })),
                    catchError((error: string) => {
                        console.warn(error);
                        return of(AuthActions.updatePageTitleFailure({ errorMessage: error }));
                    }))))
    );
}

