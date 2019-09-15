import { createAction, props } from '@ngrx/store';

const entityName = '[Public Page] ';

export const publicPageRequest = createAction(entityName + ' load request', props<{ pageName: string }>());
export const publicPageFailure = createAction(entityName + ' load  failure', props<{ errorMessage: string }>());
export const publicPageSuccess = createAction(entityName + ' load success');
