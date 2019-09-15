import { createAction, props } from '@ngrx/store';
import { ImageType, ImageEntity } from './image.entity';

const entityName = '[Images] ';

export const uploadRequest = createAction(entityName + 'Update request', props<{ data: { image: File, type: number } }>());
export const uploadFailure = createAction(entityName + 'Update Failure', props<{ errorMessage: string }>());

export const selectEntity = createAction(entityName + 'Select entity', props<{ entityId: number }>());
