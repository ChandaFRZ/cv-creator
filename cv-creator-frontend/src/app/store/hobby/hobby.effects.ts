import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { concatMap, map, catchError } from 'rxjs/operators';
import { EntityActionFactory, EntityOp } from '@ngrx/data';
import { HobbyService } from 'src/app/cv-components/hobby-box/hobby.service';
import { of } from 'rxjs';
import * as HobbyActions from './hobby.actions';

@Injectable()
export class HobbyEffects {

  constructor(
    private actions$: Actions,
    private hobbyService: HobbyService,
    private entityActionFactory: EntityActionFactory
  ) { }

  changePositionRequestEffect$ = createEffect(() => this.actions$.pipe(
    ofType(HobbyActions.updateManyRequest),
    concatMap(action =>
      this.hobbyService.updateEntities(action.entities)
        .pipe(
          map(entities => this.entityActionFactory.create('Hobby', EntityOp.SAVE_UPSERT_MANY, action.entities)),
          catchError((error: string) => {
            console.warn(error);
            return of(HobbyActions.updateManyFailure({ errorMessage: error }));
          }))))
  );
}
