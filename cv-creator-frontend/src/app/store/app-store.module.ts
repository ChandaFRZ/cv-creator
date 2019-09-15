import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultDataServiceConfig, EntityDataModule, EntityHttpResourceUrls } from '@ngrx/data';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, metaReducers } from './reducers';
import { AuthEffects } from './auth/auth.effects';
import { AddressEffects } from './address/address.effects';
import { entityConfig } from './entity-store.config';
import { ProgessionEffects } from './progression/progression.effects';
import { ExperienceEffects } from './experience/experience.effects';
import { KnowledgeEffects } from './knowledge/knowledge.effects';
import { CoreEffects } from './core/core.effects';
import { HobbyEffects } from './hobby/hobby.effects';
import { SharedEffects } from './shared/shared.effects';
import { ImageEffects } from './image/image.effects';

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: environment.baseURL + 'api',
  // timeout: 3000
};

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: false,
        strictActionSerializability: false,
      },
    }),
    EffectsModule.forRoot([
      AuthEffects,
      AddressEffects,
      CoreEffects,
      ExperienceEffects,
      HobbyEffects,
      ImageEffects,
      KnowledgeEffects,
      ProgessionEffects,
      SharedEffects,
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EntityDataModule.forRoot(entityConfig),
  ],
  providers: [
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig }
  ],
  declarations: []
})

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
  ]
})
export class AppStoreModule { }
