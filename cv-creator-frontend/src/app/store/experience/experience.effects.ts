import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { concatMap, map, catchError } from 'rxjs/operators';
import { EntityActionFactory, EntityOp } from '@ngrx/data';
import { of } from 'rxjs';
import { ExperienceService } from 'src/app/cv-components/experience-box/experience.service';
import * as ExperienceActions from './experience.actions';

@Injectable()
export class ExperienceEffects {

  constructor(
    private actions$: Actions,
    private experienceBoxService: ExperienceService,
    private entityActionFactory: EntityActionFactory
  ) { }

  changePositionRequestEffect$ = createEffect(() => this.actions$.pipe(
    ofType(ExperienceActions.updateManyRequest),
    concatMap(action =>
      this.experienceBoxService.updateEntities(action.entities)
        .pipe(
          map(entities => this.entityActionFactory.create('Experience', EntityOp.SAVE_UPSERT_MANY, action.entities)),
          catchError((error: string) => {
            console.warn(error);
            return of(ExperienceActions.updateManyFailure({ errorMessage: error }));
          }))))
  );
}
