import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceBoxComponent } from './experience-box.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { CustomFormsModule } from 'src/app/core/components/forms/forms.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ExperienceBoxComponent,
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
    ExperienceBoxComponent,
  ]
})
export class ExperienceBoxModule { }
