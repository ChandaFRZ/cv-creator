import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ImageBoxDialogComponent } from './image-box-dialog/image-box-dialog.component';
import { ImageEntity, ImageType } from 'src/app/store/image/image.entity';
import { ImageService } from './image.service';
import { ProgressBarService } from 'src/app/core/components/progress-bar/progress-bar.service';

@Component({
  selector: 'app-image-box',
  templateUrl: './image-box.component.html',
  styleUrls: ['./image-box.component.scss']
})
export class ImageBoxComponent implements OnInit, OnDestroy {
  images: ImageEntity[];

  userImage: ImageEntity;
  userImageThumbnail: ImageEntity;

  logoImage: ImageEntity;
  logoImageThumbnail: ImageEntity;

  private subs = new SubSink();

  constructor(private dialog: MatDialog, private imageService: ImageService, private progressService: ProgressBarService) { }

  ngOnInit() {
    this.subs.add(this.imageService.entities$.subscribe(
      data => {
        this.userImage = data.find(image => image.imageType === ImageType.user && !image.thumbnail);
        this.userImageThumbnail = data.find(image => image.imageType === ImageType.user && image.thumbnail);

        this.logoImage = data.find(image => image.imageType === ImageType.logo && !image.thumbnail);
        this.logoImageThumbnail = data.find(image => image.imageType === ImageType.logo && image.thumbnail);
      }
    ));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  onDelete() {
    this.progressService.updateStateEnabled(true);
    this.imageService.delete(this.userImage.id).subscribe(
      result => {
        this.progressService.updateStateEnabled(false);
        this.imageService.removeOneFromCache(this.userImageThumbnail);
        this.imageService.getAll();
      }
    );
  }

  onShowDetails(image: ImageEntity) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = '99%';
    dialogConfig.maxHeight = '99%';
    dialogConfig.data = { image };
    this.dialog.open(ImageBoxDialogComponent, dialogConfig);
  }
}
