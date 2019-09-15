import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HobbyBoxComponent } from './hobby-box.component';
import { CustomFormsModule } from 'src/app/core/components/forms/forms.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatChipsModule, MatButtonModule, MatIconModule } from '@angular/material';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HobbyBoxComponent
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
    HobbyBoxComponent
  ]
})
export class HobbyBoxModule { }
