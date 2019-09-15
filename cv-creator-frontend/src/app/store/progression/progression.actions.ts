import { createAction, props } from '@ngrx/store';
import { ProgressionEntity } from './progression.entity';

const entityName = '[Progression] ';

export const updateManyRequest = createAction(entityName + 'Update many request', props<{ entities: ProgressionEntity[] }>());
export const updateManyFailure = createAction(entityName + 'Update many failure', props<{ errorMessage: string }>());
export const selectEntity = createAction(entityName + 'Select entity', props<{ entityId: number }>());
