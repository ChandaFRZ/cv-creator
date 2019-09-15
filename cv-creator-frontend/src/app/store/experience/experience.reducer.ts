import { Action, createReducer, on } from '@ngrx/store';
import * as ExperiencActions from './experience.actions';

export interface IExperienceState {
    selectedId: number;
    maxCols: number;
    maxRows: number;
}

export const initialState: IExperienceState = {
    selectedId: -1,
    maxCols: 1,
    maxRows: 7
};

const reducer = createReducer(
    initialState,
    // select entity
    on(ExperiencActions.selectEntity, (state, { entityId }) => {
        return {
            ...state,
            selectedId: entityId
        };
    }),
);

export function experienceReducer(state: IExperienceState | undefined, action: Action) {
    return reducer(state, action);
}

