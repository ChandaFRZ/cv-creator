import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { HobbyEntity, IHobbyEntity } from 'src/app/store/hobby/hobby.entity';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiRestService } from 'src/app/shared/service/api-rest.service';

@Injectable({
  providedIn: 'root'
})
export class HobbyService extends EntityCollectionServiceBase<HobbyEntity> {

  constructor(private apiRestService: ApiRestService, serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Hobby', serviceElementsFactory);
  }

  updateEntities(data: IHobbyEntity[]): Observable<any> {
    return this.apiRestService.patch({ url: 'api/hobbies', body: data }
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error.error.message);
      })
    );
  }
}
