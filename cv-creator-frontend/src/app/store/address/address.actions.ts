import { createAction, props } from '@ngrx/store';
import { IAddressEntity } from './address.entity';

const entityName = '[Address] ';

export const loadRequest = createAction(entityName + 'Load request');
export const loadFailure = createAction(entityName + 'Load Failure', props<{ errorMessage: string }>());
export const loadSuccess = createAction(entityName + 'Load success', props<{ model: IAddressEntity }>());

export const addRequest = createAction(entityName + 'Add request', props<{ model: IAddressEntity }>());
export const addFailure = createAction(entityName + 'Add Failure', props<{ errorMessage: string }>());
export const addSuccess = createAction(entityName + 'Add success', props<{ model: IAddressEntity }>());

export const deleteRequest = createAction(entityName + 'Delete request', props<{ model: IAddressEntity }>());
export const deleteFailure = createAction(entityName + 'Delete Failure', props<{ errorMessage: string }>());
export const deleteSuccess = createAction(entityName + 'Delete success', props<{ id: number }>());

export const updateRequest = createAction(entityName + 'Update request', props<{ model: IAddressEntity }>());
export const updateFailure = createAction(entityName + 'Update Failure', props<{ errorMessage: string }>());
export const updateSuccess = createAction(entityName + 'Update success', props<{ model: IAddressEntity }>());
