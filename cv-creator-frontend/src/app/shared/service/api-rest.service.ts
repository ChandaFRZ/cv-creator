import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiRestService {

  constructor(private http: HttpClient) { }

  get(data: { url: string, source: any }): Observable<any> {
    return this.http.get<any>(environment.baseURL + data.url + '/' + data.source)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error.error.message);
        }));
  }

  post(data: { url: string, body: any }): Observable<any> {
    return this.http.post<any>(environment.baseURL + data.url, data.body)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error.error.message);
        }));
  }

  put(data: { url: string, body: any }): Observable<any> {
    return this.http.put<any>(environment.baseURL + data.url, data.body)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error.error.message);
        }));
  }

  patch(data: { url: string, body: any }): Observable<any> {
    return this.http.patch<any>(environment.baseURL + data.url, data.body)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error.error.message);
        }));
  }

  delete(data: { url: string, body: any }): Observable<any> {
    return this.http.request<any>('delete', environment.baseURL + data.url, { body: data.body })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        }));
  }
}
