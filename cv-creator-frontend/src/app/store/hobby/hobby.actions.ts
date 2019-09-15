import { createAction, props } from '@ngrx/store';
import { IHobbyEntity } from './hobby.entity';

const entityName = '[Hobby] ';

export const updateManyRequest = createAction(entityName + 'Update many request', props<{ entities: IHobbyEntity[] }>());
export const updateManyFailure = createAction(entityName + 'Update many failure', props<{ errorMessage: string }>());
export const selectEntity = createAction(entityName + 'Select entity', props<{ entityId: number }>());
