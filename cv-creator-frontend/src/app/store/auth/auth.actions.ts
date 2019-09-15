import { createAction, props } from '@ngrx/store';
import { IAuthEntity } from './auth.entity';

const entityName = '[Auth] ';

export const signInRequest = createAction(entityName + 'SignIn request', props<{ email: string, password: string }>());
export const signInFailure = createAction(entityName + 'SignIn failure', props<{ errorMessage: string }>());
export const signInSuccess = createAction(entityName + 'SignIn success', props<{ user: IAuthEntity, token: string }>());

export const signInWIthTokenRequest = createAction(entityName + 'SignIn with Token request');
export const signInWithTokenFailure = createAction(entityName + 'SignIn with Token failure', props<{ errorMessage: string }>());
export const signInWithTokenSuccess = createAction(entityName + 'SignIn with Token success', props<{ user: IAuthEntity, token: string }>());

export const signUpRequest = createAction(entityName + 'SignUp request', props<{ email: string, password: string }>());
export const signUpFailure = createAction(entityName + 'SignUp failure', props<{ errorMessage: string }>());
export const signUpSuccess = createAction(entityName + 'SignUp success', props<{ user: IAuthEntity }>());

export const updatePageTitleRequest = createAction(entityName + 'Update Pagetitle request', props<{ pageTitle: string }>());
export const updatePageTitleFailure = createAction(entityName + 'Update Pagetitle failure', props<{ errorMessage: string }>());
export const updatePageTitleSuccess = createAction(entityName + 'Update Pagetitle success', props<{ user: IAuthEntity }>());

export const signOutReqeust = createAction(entityName + 'SignOut request');
export const signOutSuccess = createAction(entityName + 'SignOut success');

export const updateLastModfiedDate = createAction(entityName + 'Last modifed date request', props<{ lastModifiedDate: Date }>());

export const clearErrorMessage = createAction(entityName + 'Clear Message');
