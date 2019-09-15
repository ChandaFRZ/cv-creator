import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ModelServiceInterface } from 'src/app/shared/interfaces/model-service.interface';
import { IAddressEntity } from 'src/app/store/address/address.entity';
import { ApiRestService } from 'src/app/shared/service/api-rest.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import * as AddressActions from './../../store/address/address.actions';

@Injectable({
  providedIn: 'root'
})
export class AddressService implements ModelServiceInterface {

  constructor(private apiRestService: ApiRestService, private store: Store<AppState>) {
  }

  storeLoadRequest() {
    this.store.dispatch(AddressActions.loadRequest());
  }

  getModel(): Observable<IAddressEntity> {
    return this.apiRestService.get({ url: 'api/address', source: '' })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        }));
  }

  addModel(model: IAddressEntity): Observable<IAddressEntity> {
    return this.apiRestService.post({ url: 'api/address', body: model })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  updateModel(model: IAddressEntity): Observable<any> {
    return this.apiRestService.put({ url: 'api/address', body: model })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  deleteModel(model: IAddressEntity): Observable<IAddressEntity> {
    return this.apiRestService.delete({ url: 'api/address', body: model })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }
}
