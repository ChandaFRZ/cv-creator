import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgressionBoxComponent } from './progression-box/progression-box.component';
import { ExperienceBoxComponent } from './experience-box/experience-box.component';
import { KnowledgeBoxComponent } from './knowledge-box/knowledge-box.component';
import { HobbyBoxComponent } from './hobby-box/hobby-box.component';

const routes: Routes = [
  {
    path: 'progression',
    component: ProgressionBoxComponent
  },
  {
    path: 'experience',
    component: ExperienceBoxComponent
  },
  {
    path: 'knowledge',
    component: KnowledgeBoxComponent
  },
  {
    path: 'hobby',
    component: HobbyBoxComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CVComponentsRoutingModule { }
