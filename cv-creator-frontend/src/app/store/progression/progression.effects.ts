import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { concatMap, map, catchError } from 'rxjs/operators';
import { EntityActionFactory, EntityOp } from '@ngrx/data';
import { of } from 'rxjs';
import { ProgressionService } from 'src/app/cv-components/progression-box/progression.service';
import * as ProgressionActions from './progression.actions';

@Injectable()
export class ProgessionEffects {

  constructor(
    private actions$: Actions,
    private progressionService: ProgressionService,
    private entityActionFactory: EntityActionFactory
  ) { }

  changePositionRequestEffect$ = createEffect(() => this.actions$.pipe(
    ofType(ProgressionActions.updateManyRequest),
    concatMap(action =>
      this.progressionService.updateEntities(action.entities)
        .pipe(
          map(entities => this.entityActionFactory.create('Progression', EntityOp.SAVE_UPSERT_MANY, action.entities)),
          catchError((error: string) => {
            console.warn(error);
            return of(ProgressionActions.updateManyFailure({ errorMessage: error }));
          }))))
  );
}
