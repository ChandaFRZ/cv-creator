import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { ExperienceEntity, IExperienceEntity } from 'src/app/store/experience/experience.entity';
import { ApiRestService } from 'src/app/shared/service/api-rest.service';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService extends EntityCollectionServiceBase<ExperienceEntity> {

  constructor(private apiRestService: ApiRestService, serviceElementsFacotry: EntityCollectionServiceElementsFactory) {
    super('Experience', serviceElementsFacotry);
  }

  updateEntities(data: IExperienceEntity[]): Observable<any> {
    return this.apiRestService.patch({ url: 'api/experiences', body: data }
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error.error.message);
      })
    );
  }
}
