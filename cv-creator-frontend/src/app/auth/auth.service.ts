import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError, Subject, of } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from '../store/reducers';
import { ApiRestService } from '../shared/service/api-rest.service';
import * as AuthActions from '../store/auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  redirectUrl: string;

  constructor(private apiService: ApiRestService, private http: HttpClient, private store: Store<AppState>) {
    this.store.select(state => state.authState.isLoggedIn).subscribe(
      data => this.isLoggedIn = data || this.isTokenValid());
  }

  signIn(authData: { email: string, password: string }): Observable<any> {
    return this.http.post(environment.baseURL + 'auth/login',
      { email: authData.email, password: authData.password })
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  signUp(authData: { email: string, password: string }): Observable<any> {
    return this.http.post(environment.baseURL + 'auth/register',
      { email: authData.email, password: authData.password })
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  loginWithToken(): Observable<any> {
    return this.http.get(environment.baseURL + 'api/auth/validate')
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  signOut(): Observable<any> {
    this.resetTokenInLocalStorage();
    location.reload();
    return of(true);
  }

  updatePublicPageTitle(data: { pageTitle: string }): Observable<any> {
    return this.apiService.put({ url: 'api/user/pagetitle', body: data })
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  autoLogin(): boolean {
    if (!this.isTokenValid()) {
      return;
    }

    this.store.dispatch(AuthActions.signInWIthTokenRequest());
  }

  getParamFromToken(): HttpParams {
    const token = this.getTokenFormLocalStorage();
    return new HttpParams().set('token', token);
  }

  isTokenValid(): boolean {
    return localStorage.getItem('key') != null;
  }

  setTokenInLocalStorage(token: string): void {
    localStorage.setItem('key', token);
  }

  getTokenFormLocalStorage() {
    return 'Bearer ' + localStorage.getItem('key');
  }

  private resetTokenInLocalStorage(): void {
    localStorage.clear();
  }

  private authenticateUserWithEmailAndPassword(authData: { email: string, password: string }): Observable<any> {
    return this.http.post(environment.baseURL + 'auth/authenticate',
      { email: authData.email, password: authData.password })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error.error.message);
        })
      );
  }
}

