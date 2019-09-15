import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicPageService {

  constructor(private http: HttpClient) {
  }

  loadPublicPage(data: { pageName: string }): Observable<any> {
    return this.http.get(environment.baseURL + 'public/' + data.pageName)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

}

