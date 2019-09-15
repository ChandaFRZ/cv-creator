import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportButtonComponent } from './export-button.component';
import { MatButtonModule, MatIconModule } from '@angular/material';

@NgModule({
  declarations: [
    ExportButtonComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    ExportButtonComponent
  ]
})
export class ExportButtonModule { }
