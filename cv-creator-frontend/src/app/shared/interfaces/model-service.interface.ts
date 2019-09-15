import { ModelServiceInterface } from './model-service.interface';
import { Observable } from 'rxjs';

export interface ModelServiceInterface {

    getModel(): Observable<any>;

    addModel(model: any): Observable<any>;

    updateModel(model: any): Observable<any>;

    deleteModel(model: any): Observable<any>;
}
