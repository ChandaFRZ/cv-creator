import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<IAuthState>('authState');

export const selectLastModifiedDate = createSelector(
    selectAuthState,
    state => state.lastModifiedDate
);

export const selectUser = createSelector(
    selectAuthState,
    state => state.user
);
