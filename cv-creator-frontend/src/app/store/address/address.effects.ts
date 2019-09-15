import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { concatMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AddressService } from 'src/app/cv-components/address-box/address.service';
import * as AddressActions from './address.actions';

@Injectable()
export class AddressEffects {

  constructor(
    private actions$: Actions,
    private addressBoxService: AddressService
  ) { }

  loadRequestEffect$ = createEffect(() => this.actions$.pipe(
    ofType(AddressActions.loadRequest),
    concatMap(action =>
      this.addressBoxService.getModel()
        .pipe(
          map(model => AddressActions.loadSuccess({ model })),
          catchError((error) => {
            console.warn(error);
            return of(AddressActions.loadFailure({ errorMessage: error }));
          }))))
  );

  addRequestEffect$ = createEffect(() => this.actions$.pipe(
    ofType(AddressActions.addRequest),
    concatMap(action =>
      this.addressBoxService.addModel(action.model)
        .pipe(
          map(model => AddressActions.addSuccess({ model })),
          catchError((error: string) => {
            console.warn(error);
            return of(AddressActions.addFailure({ errorMessage: error }));
          }))))
  );

  updateRequestEffect$ = createEffect(() => this.actions$.pipe(
    ofType(AddressActions.updateRequest),
    concatMap(action =>
      this.addressBoxService.updateModel(action.model)
        .pipe(
          map(model => AddressActions.updateSuccess({ model })),
          catchError((error: string) => {
            console.warn(error);
            return of(AddressActions.updateFailure({ errorMessage: error }));
          })))));

  deleteRequestEffect$ = createEffect(() => this.actions$.pipe(
    ofType(AddressActions.deleteRequest),
    concatMap(action =>
      this.addressBoxService.deleteModel(action.model)
        .pipe(
          map(model => AddressActions.deleteSuccess({ id: action.model.id })),
          catchError((error: string) => {
            console.warn(error);
            return of(AddressActions.deleteFailure({ errorMessage: error }));
          }))))
  );
}
