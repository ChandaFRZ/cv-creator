import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EntityActionFactory, EntityOp } from '@ngrx/data';
import { Injectable } from '@angular/core';
import { concatMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ImageService } from 'src/app/cv-components/image-box/image.service';
import { SharedService } from 'src/app/shared/shared.service';
import { ProgressBarService } from 'src/app/core/components/progress-bar/progress-bar.service';
import * as ImageActions from './images.actions';

@Injectable()
export class ImageEffects {

  constructor(
    private actions$: Actions,
    private entityActionFactory: EntityActionFactory,
    private imageService: ImageService,
    private sharedServce: SharedService,
    private progressService: ProgressBarService
  ) { }

  updateRequestEffect$ = createEffect(() => this.actions$.pipe(
    ofType(ImageActions.uploadRequest),
    concatMap(action =>
      this.imageService.uploadImageByType({ image: action.data.image, type: action.data.type })
        .pipe(
          map(entites => {
            this.progressService.updateStateEnabled(false);
            this.sharedServce.openSnackBar({ message: 'Image successfully uploaded!', action: 'Image' });
            return this.entityActionFactory.create('Image', EntityOp.UPSERT_MANY, entites);
          }),
          catchError((error: string) => {
            this.sharedServce.openSnackBar({ message: error, action: 'Image' });
            return of(ImageActions.uploadFailure({ errorMessage: error }));
          }))))
  );
}
