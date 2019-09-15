import { Action, createReducer, on } from '@ngrx/store';
import * as ImagesActions from './images.actions';

export interface IImageState {
  selectedId: number;
}

export const initialState: IImageState = {
  selectedId: -1,
};

const reducer = createReducer(
  initialState,
  // select entity
  on(ImagesActions.selectEntity, (state, { entityId }) => {
    return {
      ...state,
      selectedId: entityId
    };
  })
);

export function imageReducer(state: IImageState | undefined, action: Action) {
  return reducer(state, action);
}
