import { createReducer, on, Action } from '@ngrx/store';
import { IAuthEntity } from './auth.entity';
import * as AuthActions from './auth.actions';

export interface IAuthState {
    user: IAuthEntity;
    token: string;
    isLoggedIn: boolean;
    isLoading: boolean;
    errorMessage: string;
    lastModifiedDate: Date;
}

export const initialState: IAuthState = {
    user: null,
    token: null,
    isLoggedIn: false,
    isLoading: false,
    errorMessage: null,
    lastModifiedDate: null
};

const reducer = createReducer(
    initialState,
    // sign in
    on(AuthActions.signInRequest, state => (
        {
            ...state,
            user: null,
            token: null,
            isLoggedIn: false,
            isLoading: true,
            errorMessage: null,
            lastModifiedDate: null
        }
    )),
    on(AuthActions.signInSuccess, (state, { user, token }) => {
        return {
            ...state,
            user,
            token,
            isLoggedIn: true,
            isLoading: false,
            lastModifiedDate: user.lastModifiedDate
        };
    }),
    on(AuthActions.signInFailure, (state, { errorMessage }) => ({
        ...state,
        token: null,
        isLoggedIn: false,
        isLoading: false,
        errorMessage,
        lastModifiedDate: null
    })),

    // sign out
    on(AuthActions.signOutReqeust, state => (
        {
            ...state,
        }
    )),
    on(AuthActions.signOutSuccess, state => (
        {
            ...state,
            user: null,
            token: null,
            isLoggedIn: false,
            isLoading: false,
            lastModifiedDate: null
        }
    )),

    // sign in with token
    on(AuthActions.signInWIthTokenRequest, state => (
        {
            ...state,
            user: null,
            token: null,
            isLoggedIn: false,
            isLoading: false,
            errorMessage: null,
            lastModifiedDate: null
        }
    )),
    on(AuthActions.signInWithTokenSuccess, (state, { user, token }) => {
        return {
            ...state,
            user,
            token,
            isLoggedIn: true,
            isLoading: false,
            lastModifiedDate: user.lastModifiedDate
        };
    }),
    on(AuthActions.signInWithTokenFailure, (state, { errorMessage }) => ({
        ...state,
        token: null,
        isLoading: false,
        errorMessage,
        lastModifiedDate: null
    })),

    // sign up
    on(AuthActions.signUpRequest, state => (
        {
            ...state,
            user: null,
            token: null,
            isLoggedIn: false,
            isLoading: true,
            errorMessage: null,
            lastModifiedDate: null
        }
    )),
    on(AuthActions.signUpSuccess, (state, { user }) => {
        return {
            ...state,
            user: null,
            token: null,
            isLoggedIn: false,
            isLoading: false,
            lastModifiedDate: null,
        };
    }),
    on(AuthActions.signUpFailure, (state, { errorMessage }) => ({
        ...state,
        token: null,
        isLoading: false,
        isLoggedIn: false,
        errorMessage,
        lastModifiedDate: null
    })),


    // update pagetitle
    on(AuthActions.updatePageTitleRequest, state => (
        {
            ...state,
            isLoading: true,
            errorMessage: null
        }
    )),
    on(AuthActions.updatePageTitleSuccess, (state, { user }) => {
        return {
            ...state,
            user,
            isLoading: false,
        };
    }),
    on(AuthActions.signUpFailure, (state, { errorMessage }) => ({
        ...state,
        isLoading: false,
        errorMessage,
    })),

    on(AuthActions.updateLastModfiedDate, (state, { lastModifiedDate }) => ({
        ...state,
        isLoading: false,
        lastModifiedDate
    })),

    // clear error messages
    on(AuthActions.clearErrorMessage, state => (
        {
            ...state,
            isLoading: false,
            errorMessage: null
        }
    ))
);

export function authReducer(state: IAuthState | undefined, action: Action) {
    return reducer(state, action);
}
