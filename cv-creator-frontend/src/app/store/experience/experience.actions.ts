import { createAction, props } from '@ngrx/store';
import { IExperienceEntity } from './experience.entity';

const entityName = '[Experience] ';

export const updateManyRequest = createAction(entityName + 'Update many request', props<{ entities: IExperienceEntity[] }>());
export const updateManyFailure = createAction(entityName + 'Update many failure', props<{ errorMessage: string }>());
export const selectEntity = createAction(entityName + 'Select entity', props<{ entityId: number }>());
