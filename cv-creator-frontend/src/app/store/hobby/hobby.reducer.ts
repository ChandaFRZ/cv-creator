import { Action, createReducer, on } from '@ngrx/store';
import * as HobbyActions from './hobby.actions';

export interface IHobbyState {
  selectedId: number;
  maxCols: number;
  maxRows: number;
}

export const initialState: IHobbyState = {
  selectedId: -1,
  maxCols: 1,
  maxRows: 10
};

const reducer = createReducer(
  initialState,
  // select entity
  on(HobbyActions.selectEntity, (state, { entityId }) => {
    return {
      ...state,
      selectedId: entityId
    };
  }),
);

export function hobbyReducer(state: IHobbyState | undefined, action: Action) {
  return reducer(state, action);
}
