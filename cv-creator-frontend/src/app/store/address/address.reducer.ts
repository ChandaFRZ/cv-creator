import { Action, createReducer, on } from '@ngrx/store';
import { IAddressEntity } from './address.entity';
import * as AddressActions from './address.actions';

export interface IAddressState {
    address: IAddressEntity;
    isLoading: boolean;
    errorMessage: string;
    selectedId: number;
}

export const initialState: IAddressState = {
    address: null,
    isLoading: false,
    errorMessage: null,
    selectedId: -1
};

const reducer = createReducer(
    initialState,
    // load
    on(AddressActions.loadRequest, state => (
        {
            ...state,
            address: null,
            isLoading: true,
            errorMessage: null,
            selectedId: -1
        })),
    on(AddressActions.loadSuccess, (state, { model }) => {
        return {
            ...state,
            address: model,
            isLoading: false,
            errorMessage: null,
            selectedId: -1
        };
    }),
    on(AddressActions.loadFailure, (state, { errorMessage }) => ({
        ...state,
        address: null,
        isLoading: false,
        errorMessage,
        selectedId: -1
    })),

    // add
    on(AddressActions.addRequest, state => (
        {
            ...state,
            isLoading: true,
        })),
    on(AddressActions.addSuccess, (state, { model }) => {
        return {
            ...state,
            address: model,
            isLoading: false,
            errorMessage: null,
            selectedId: -1
        };
    }),
    on(AddressActions.addFailure, state => (
        {
            ...state,
            address: null,
            isLoading: false,
            errorMessage: null,
            selectedId: -1
        })),

    // update
    on(AddressActions.updateRequest, state => (
        {
            ...state,
            isLoading: true,
        })),
    on(AddressActions.updateSuccess, (state, { model }) => {
        return {
            ...state,
            address: model,
            isLoading: false,
            errorMessage: null,
            selectedId: -1
        };
    }),
    on(AddressActions.updateFailure, state => (
        {
            ...state,
            address: null,
            isLoading: false,
            errorMessage: null,
            selectedId: -1
        })),

    // delete
    on(AddressActions.deleteRequest, state => (
        {
            ...state,
            isLoading: true,
        })),
    on(AddressActions.deleteSuccess, (state) => {
        return {
            ...state,
            address: null,
            isLoading: false,
            errorMessage: null,
            selectedId: -1
        };
    }),
    on(AddressActions.deleteFailure, state => (
        {
            ...state,
            isLoading: false,
            errorMessage: null,
            selectedId: -1
        })),
);

export function addressReducer(state: IAddressState | undefined, action: Action) {
    return reducer(state, action);
}

