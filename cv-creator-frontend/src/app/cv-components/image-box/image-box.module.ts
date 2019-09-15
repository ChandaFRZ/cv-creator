import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageBoxComponent } from './image-box.component';
import { CustomFormsModule } from 'src/app/core/components/forms/forms.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material';
import { ImageBoxDialogComponent } from './image-box-dialog/image-box-dialog.component';

@NgModule({
  declarations: [
    ImageBoxComponent,
    ImageBoxDialogComponent

  ],
  imports: [
    CommonModule,
    CustomFormsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  exports: [
    ImageBoxComponent,
  ],
  entryComponents: [
    ImageBoxDialogComponent
  ],
})
export class ImageBoxModule { }
