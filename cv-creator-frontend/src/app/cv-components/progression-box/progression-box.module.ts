import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressionBoxComponent } from './progression-box.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { CustomFormsModule } from 'src/app/core/components/forms/forms.module';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ProgressionBoxComponent,
  ],
  imports: [
    CommonModule,
    CustomFormsModule,
    DragDropModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  exports: [
    ProgressionBoxComponent
  ]
})
export class ProgressionBoxModule { }
