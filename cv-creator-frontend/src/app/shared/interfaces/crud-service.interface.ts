import { Observable } from 'rxjs';

export interface CrudServiceInterface {

    getAllEntites(): Observable<any[]>;

    getAllEntitiesByType(type: number): Observable<any[]>;

    addEntity(data: any): Observable<any>;

    updateEntity(data: any): Observable<any>;

    updateEntities(data: any[]): Observable<any>;

    deleteEntity(data: any): Observable<any>;
}
