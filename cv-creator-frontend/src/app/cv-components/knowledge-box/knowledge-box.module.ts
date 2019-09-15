import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KnowledgeBoxComponent } from './knowledge-box.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { CustomFormsModule } from 'src/app/core/components/forms/forms.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    KnowledgeBoxComponent,
  ],
  imports: [
    CommonModule,
    CustomFormsModule,
    DragDropModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
  exports: [
    KnowledgeBoxComponent,
  ]
})
export class KnowledgeBoxModule { }
