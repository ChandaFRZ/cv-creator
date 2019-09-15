import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ImageEntity } from 'src/app/store/image/image.entity';

@Component({
  selector: 'app-image-box-dialog',
  templateUrl: './image-box-dialog.component.html',
  styleUrls: ['./image-box-dialog.component.scss']
})
export class ImageBoxDialogComponent {

  constructor(public dialogRef: MatDialogRef<ImageBoxDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { image: ImageEntity }) {
  }
}
