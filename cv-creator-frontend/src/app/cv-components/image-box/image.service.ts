import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ImageEntity } from 'src/app/store/image/image.entity';
import { ProgressBarService } from 'src/app/core/components/progress-bar/progress-bar.service';
import { ApiRestService } from 'src/app/shared/service/api-rest.service';
import * as ImageActions from './../../store/image/images.actions';

@Injectable({
  providedIn: 'root'
})
export class ImageService extends EntityCollectionServiceBase<ImageEntity> {

  constructor(private progressService: ProgressBarService,
              private apiRestService: ApiRestService,
              serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Image', serviceElementsFactory);
  }

  storeUploadImageByTypeRequest(data: { image: File, type: number }) {
    this.progressService.updateStateEnabled(true);
    this.store.dispatch(ImageActions.uploadRequest({ data: { image: data.image, type: data.type } }));
  }

  uploadImageByType(data: { image: File, type: number }) {
    const formData = new FormData();
    formData.append('image', data.image);
    return this.apiRestService.post({ url: 'api/files/image/' + data.type, body: formData })
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }
}
