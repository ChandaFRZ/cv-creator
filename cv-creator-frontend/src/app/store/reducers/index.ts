import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { IAuthState, authReducer } from '../auth/auth.reducer';
import { IAddressState, addressReducer } from '../address/address.reducer';
import { IProgressionState, progressionReducer } from '../progression/progression.reducer';
import { IExperienceState, experienceReducer } from '../experience/experience.reducer';
import { IKnowledgeState, knowledgeReducer } from '../knowledge/knowledge.reducer';
import { ICoreState, coreReducer } from '../core/core.reducer';
import { IHobbyState, hobbyReducer } from '../hobby/hobby.reducer';
import { environment } from 'src/environments/environment';

export interface AppState {
  authState: IAuthState;
  coreState: ICoreState;
  addresState: IAddressState;
  progressionState: IProgressionState;
  experienceState: IExperienceState;
  knowledgeState: IKnowledgeState;
  hobbyState: IHobbyState;
}

export const reducers: ActionReducerMap<AppState> = {
  authState: authReducer,
  coreState: coreReducer,
  addresState: addressReducer,
  progressionState: progressionReducer,
  experienceState: experienceReducer,
  knowledgeState: knowledgeReducer,
  hobbyState: hobbyReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
