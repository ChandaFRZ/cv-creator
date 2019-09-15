import { Action, createReducer, on } from '@ngrx/store';
import * as ProgressionActions from './progression.actions';

export interface IProgressionState {
    selectedId: number;
    maxCols: number;
    maxRows: number;
}

export const initialState: IProgressionState = {
    selectedId: -1,
    maxCols: 2,
    maxRows: 10
};

const reducer = createReducer(
    initialState,
    // select entity
    on(ProgressionActions.selectEntity, (state, { entityId }) => {
        return {
            ...state,
            selectedId: entityId
        };
    }),
);

export function progressionReducer(state: IProgressionState | undefined, action: Action) {
    return reducer(state, action);
}

