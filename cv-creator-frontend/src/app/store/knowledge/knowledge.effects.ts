import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { concatMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { KnowledgeService } from 'src/app/cv-components/knowledge-box/knowledge.service';
import { EntityActionFactory, EntityOp } from '@ngrx/data';
import * as KnowledgeActions from './knowledge.actions';

@Injectable()
export class KnowledgeEffects {

  constructor(
    private actions$: Actions,
    private knowledgeBoxService: KnowledgeService,
    private entityActionFactory: EntityActionFactory
  ) { }

  loadRequestEffect$ = createEffect(() => this.actions$.pipe(
    ofType(KnowledgeActions.loadRequest),
    concatMap(action =>
      this.knowledgeBoxService.getAllEntites()
        .pipe(
          map(entities => KnowledgeActions.loadSuccess({ entities })),
          catchError((error: string) => {
            console.warn(error);
            return of(KnowledgeActions.loadFailure({ errorMessage: error }));
          }))))
  );

  addRequestEffect$ = createEffect(() => this.actions$.pipe(
    ofType(KnowledgeActions.addRequest),
    concatMap(action =>
      this.knowledgeBoxService.addEntity(action.entity)
        .pipe(
          map(entity => KnowledgeActions.addSuccess({ entity })),
          catchError((error: string) => {
            console.warn(error);
            return of(KnowledgeActions.addFailure({ errorMessage: error }));
          }))))
  );

  deleteRequestEffect$ = createEffect(() => this.actions$.pipe(
    ofType(KnowledgeActions.deleteRequest),
    concatMap(action =>
      this.knowledgeBoxService.deleteEntity(action.entity)
        .pipe(
          map(entity => KnowledgeActions.deleteSuccess({ id: action.entity.id })),
          catchError((error: string) => {
            console.warn(error);
            return of(KnowledgeActions.deleteFailure({ errorMessage: error }));
          }))))
  );

  updateRequestEffect$ = createEffect(() => this.actions$.pipe(
    ofType(KnowledgeActions.updateRequest),
    concatMap(action =>
      this.knowledgeBoxService.updateEntity(action.entity)
        .pipe(
          map(entity => KnowledgeActions.updateSuccess({ entity })),
          catchError((error: string) => {
            console.warn(error);
            return of(KnowledgeActions.updateFailure({ errorMessage: error }));
          })))));


  changePositionRequestEffect$ = createEffect(() => this.actions$.pipe(
    ofType(KnowledgeActions.updateManyRequest),
    concatMap(action =>
      this.knowledgeBoxService.updateEntities(action.entities)
        .pipe(
          map(entities => this.entityActionFactory.create('Knowledge', EntityOp.SAVE_UPSERT_MANY, action.entities)),
          catchError((error: string) => {
            console.warn(error);
            return of(KnowledgeActions.updateManyFailure({ errorMessage: error }));
          }))))
  );
}
