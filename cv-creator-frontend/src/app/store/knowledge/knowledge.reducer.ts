import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IKnowledgeEntity } from './knowlege.entity';
import * as ExperienceBoxActions from './knowledge.actions';

export const experienceBoxAdapter: EntityAdapter<IKnowledgeEntity> = createEntityAdapter<IKnowledgeEntity>({
});

export interface IKnowledgeState extends EntityState<IKnowledgeEntity> {
    actionType: string;
    isLoading: boolean;
    errorMessage: string;
    selectedId: number;
    maxCols: number;
    maxRows: number;
}

export const initialState: IKnowledgeState = experienceBoxAdapter.getInitialState({
    actionType: 'init',
    isLoading: false,
    errorMessage: null,
    selectedId: -1,
    maxCols: 4,
    maxRows: 10
});

const reducer = createReducer(
    initialState,
    // load all entites
    on(ExperienceBoxActions.loadRequest, state => (
        {
            ...state,
            isLoading: true,
            errorMessage: null,
            selectedId: -1,
        })),
    on(ExperienceBoxActions.loadSuccess, (state, { entities }) => {
        return experienceBoxAdapter.addMany(entities, {
            ...state,
            isLoading: false,
            errorMessage: null,
            selectedId: -1
        });
    }),
    on(ExperienceBoxActions.loadFailure, (state, { errorMessage }) => ({
        ...state,
        isLoading: false,
        errorMessage,
        selectedId: -1
    })),

    // adding entity
    on(ExperienceBoxActions.addRequest, state => (
        {
            ...state,
            isLoading: true,
            errorMessage: null,
            selectedId: -1
        })),
    on(ExperienceBoxActions.addSuccess, (state, { entity }) => {
        return experienceBoxAdapter.addOne(entity, {
            ...state,
            isLoading: false,
            errorMessage: null,
            selectedId: -1
        });
    }),
    on(ExperienceBoxActions.addFailure, state => (
        {
            ...state,
            isLoading: false,
            errorMessage: null,
            selectedId: -1
        })),

    // remove entity
    on(ExperienceBoxActions.deleteRequest, state => (
        {
            ...state,
            isLoading: true,
            errorMessage: null,
            selectedId: -1
        })),
    on(ExperienceBoxActions.deleteSuccess, (state, { id }) => {
        return experienceBoxAdapter.removeOne(id, {
            ...state,
            isLoading: false,
            errorMessage: null,
            selectedId: -1
        });
    }),
    on(ExperienceBoxActions.deleteFailure, state => (
        {
            ...state,
            isLoading: false,
            errorMessage: null,
            selectedId: -1
        })),

    // update entity
    on(ExperienceBoxActions.updateRequest, state => (
        {
            ...state,
            isLoading: true,
            errorMessage: null,
            selectedId: -1
        })),
    on(ExperienceBoxActions.updateSuccess, (state, { entity }) => {
        return experienceBoxAdapter.updateOne(entity, {
            ...state,
            isLoading: false,
            errorMessage: null,
            selectedId: -1
        });
    }),
    on(ExperienceBoxActions.updateFailure, state => (
        {
            ...state,
            isLoading: false,
            errorMessage: null,
            selectedId: -1
        })),

    // update entites
    on(ExperienceBoxActions.updateManyRequest, state => (
        {
            ...state,
            isLoading: false,
            errorMessage: null,
            selectedId: -1
        })),
    on(ExperienceBoxActions.updateManySuccess, (state, { entities }) => {
        return experienceBoxAdapter.updateMany(entities, {
            ...state,
            isLoading: false,
            errorMessage: null,
            selectedId: -1
        });
    }),
    on(ExperienceBoxActions.updateManyFailure, state => (
        {
            ...state,
            isLoading: false,
            errorMessage: null,
            selectedId: -1
        })),

    // select entity
    on(ExperienceBoxActions.selectEntity, (state, { entityId }) => {
        return {
            ...state,
            isLoading: false,
            errorMessage: null,
            selectedId: entityId
        };
    })
);

export function knowledgeReducer(state: IKnowledgeState | undefined, action: Action) {
    return reducer(state, action);
}

