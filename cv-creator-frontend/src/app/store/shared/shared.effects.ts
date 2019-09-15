import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PublicPageService } from 'src/app/pages/public/public-page.service';
import { HobbyService } from 'src/app/cv-components/hobby-box/hobby.service';
import { KnowledgeService } from 'src/app/cv-components/knowledge-box/knowledge.service';
import { ExperienceService } from 'src/app/cv-components/experience-box/experience.service';
import { ProgressionService } from 'src/app/cv-components/progression-box/progression.service';
import { IPublicPageResponse } from 'src/app/shared/models/public-page.response';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { concatMap, map, catchError } from 'rxjs/operators';
import { ImageService } from 'src/app/cv-components/image-box/image.service';
import { of } from 'rxjs';
import * as SharedActions from '../shared/shared.actions';
import * as AddressActions from './../address/address.actions';
import * as AuthActions from './../../store/auth/auth.actions';
@Injectable()
export class SharedEffects {

  constructor(private actions$: Actions,
              private publicPageService: PublicPageService,
              private hobbyBoxService: HobbyService,
              private experienceService: ExperienceService,
              private knowledgeService: KnowledgeService,
              private imageService: ImageService,
              private progressionBoxService: ProgressionService,
              private store: Store<AppState>) { }

  publicPageRequest$ = createEffect(() => this.actions$.pipe(
    ofType(SharedActions.publicPageRequest),
    concatMap(action =>
      this.publicPageService.loadPublicPage({ pageName: action.pageName })
        .pipe(
          map((data: IPublicPageResponse) => {
            this.store.dispatch(AddressActions.addSuccess({ model: data.address }));
            this.experienceService.addAllToCache(data.experiences);
            this.hobbyBoxService.addAllToCache(data.hobbies);
            this.knowledgeService.addAllToCache(data.knowledges);
            this.progressionBoxService.addAllToCache(data.progressions);
            this.imageService.addAllToCache(data.images);
            this.store.dispatch(AuthActions.updateLastModfiedDate({ lastModifiedDate: data.lastModifiedDate }));
            return SharedActions.publicPageSuccess();
          }),
          catchError((error: string) => {
            console.warn(error);
            return of(SharedActions.publicPageFailure({ errorMessage: error }));
          }))))
  );
}
