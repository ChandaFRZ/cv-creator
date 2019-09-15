import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarComponent } from './progress-bar.component';
import { MatProgressBarModule } from '@angular/material';

@NgModule({
  declarations: [
    ProgressBarComponent
  ],
  imports: [
    CommonModule,
    MatProgressBarModule
  ],
  exports: [
    ProgressBarComponent
  ]
})
export class ProgressBarModule { }
