import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ProgressionEntity } from 'src/app/store/progression/progression.entity';
import { ApiRestService } from 'src/app/shared/service/api-rest.service';

@Injectable({
  providedIn: 'root'
})
export class ProgressionService extends EntityCollectionServiceBase<ProgressionEntity> {
  constructor(private apiRestService: ApiRestService, serviceElementsFacotry: EntityCollectionServiceElementsFactory) {
    super('Progression', serviceElementsFacotry);
  }

  updateEntities(data: ProgressionEntity[]): Observable<any> {
    return this.apiRestService.patch({ url: 'api/progressions', body: data }
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error.error.message);
      })
    );
  }
}
