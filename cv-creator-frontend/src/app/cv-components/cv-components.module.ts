import { KnowledgeBoxModule } from './knowledge-box/knowledge-box.module';
import { AddressBoxModule } from './address-box/address-box.module';
import { ProgressionBoxModule } from './progression-box/progression-box.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceBoxModule } from './experience-box/experience-box.module';
import { HobbyBoxModule } from './hobby-box/hobby-box.module';
import { ImageBoxModule } from './image-box/image-box.module';
import { CVComponentsRoutingModule } from './cv-component-routing.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CVComponentsRoutingModule,
    AddressBoxModule,
    ExperienceBoxModule,
    HobbyBoxModule,
    ImageBoxModule,
    KnowledgeBoxModule,
    ProgressionBoxModule,
  ],
  exports: [
    AddressBoxModule,
    ExperienceBoxModule,
    HobbyBoxModule,
    KnowledgeBoxModule,
    ImageBoxModule,
    ProgressionBoxModule,
  ]
})
export class CvComponentsModule { }
