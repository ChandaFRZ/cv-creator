import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IKnowledgeState } from './knowledge.reducer';

export const selectKnowledgeBoxState = createFeatureSelector<IKnowledgeState>('knowledgeBoxState');
export const selectAllKnowledgeBoxes = createSelector(
    selectKnowledgeBoxState,
    knowledgeBoxState => Object.values(knowledgeBoxState.entities)
);

