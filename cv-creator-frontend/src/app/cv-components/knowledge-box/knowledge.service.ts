import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CrudServiceInterface } from 'src/app/shared/interfaces/crud-service.interface';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { KnowledgeEntity, IKnowledgeEntity } from 'src/app/store/knowledge/knowlege.entity';
import { ApiRestService } from 'src/app/shared/service/api-rest.service';

@Injectable({
  providedIn: 'root'
})
export class KnowledgeService extends EntityCollectionServiceBase<KnowledgeEntity> implements CrudServiceInterface {

  positionUpChangeSubject$: Subject<KnowledgeEntity>;
  positionDownChangeSubject$: Subject<KnowledgeEntity>;

  constructor(private apiRestService: ApiRestService,
              serviceElementsFacotry: EntityCollectionServiceElementsFactory) {
    super('Knowledge', serviceElementsFacotry);
    this.positionUpChangeSubject$ = new Subject();
    this.positionDownChangeSubject$ = new Subject();
  }

  setPositionUp(entity: KnowledgeEntity) {
    this.positionUpChangeSubject$.next(entity);
  }

  setPositionDown(entity: KnowledgeEntity) {
    this.positionDownChangeSubject$.next(entity);
  }

  getAllEntites(): Observable<IKnowledgeEntity[]> {
    return this.apiRestService.get({ url: 'api/knowledges', source: '' })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          return throwError(error);
        }));
  }

  getAllEntitiesByType(type: number): Observable<IKnowledgeEntity[]> {
    return this.apiRestService.get({ url: 'api/knowledges', source: type })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error.error.message);
        }));
  }

  addEntity(data: IKnowledgeEntity): Observable<IKnowledgeEntity> {
    return this.apiRestService.post({ url: 'api/knowledge', body: data })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error.error.message);
        })
      );
  }

  updateEntity(data: IKnowledgeEntity): Observable<any> {
    return this.apiRestService.put({ url: 'api/knowledge', body: data })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error.error.message);
        })
      );
  }

  updateEntities(data: IKnowledgeEntity[]): Observable<any> {
    return this.apiRestService.patch({ url: 'api/knowledges', body: data }
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error.error.message);
      })
    );
  }

  deleteEntity(data: IKnowledgeEntity): Observable<IKnowledgeEntity> {
    return this.apiRestService.delete({ url: 'api/knowledge', body: data })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error.error.message);
        })
      );
  }
}
