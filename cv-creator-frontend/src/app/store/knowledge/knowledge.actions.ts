import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { IKnowledgeEntity } from './knowlege.entity';

const entityName = '[Knowledge] ';

export const loadRequest = createAction(entityName + 'Load request');
export const loadFailure = createAction(entityName + 'Load failure', props<{ errorMessage: string }>());
export const loadSuccess = createAction(entityName + 'Load success', props<{ entities: IKnowledgeEntity[] }>());

export const addRequest = createAction(entityName + 'Add request', props<{ entity: IKnowledgeEntity }>());
export const addFailure = createAction(entityName + 'Add failure', props<{ errorMessage: string }>());
export const addSuccess = createAction(entityName + 'Add success', props<{ entity: IKnowledgeEntity }>());

export const deleteRequest = createAction(entityName + 'Delete request', props<{ entity: IKnowledgeEntity }>());
export const deleteFailure = createAction(entityName + 'Delete failure', props<{ errorMessage: string }>());
export const deleteSuccess = createAction(entityName + 'Delete success', props<{ id: number }>());

export const updateRequest = createAction(entityName + 'Update request', props<{ entity: IKnowledgeEntity }>());
export const updateFailure = createAction(entityName + 'Update failure', props<{ errorMessage: string }>());
export const updateSuccess = createAction(entityName + 'Update success', props<{ entity: Update<IKnowledgeEntity> }>());

export const updateManyRequest = createAction(entityName + 'Update many request', props<{ entities: IKnowledgeEntity[] }>());
export const updateManyFailure = createAction(entityName + 'Update many failure', props<{ errorMessage: string }>());
export const updateManySuccess =
    createAction(entityName + 'Update many success', props<{ entities: Update<IKnowledgeEntity>[] }>());

export const selectEntity = createAction(entityName + 'Select entity', props<{ entityId: number }>());
