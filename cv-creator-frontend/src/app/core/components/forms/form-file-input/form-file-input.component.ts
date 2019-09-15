import { Component, Input } from '@angular/core';
import { ImageService } from 'src/app/cv-components/image-box/image.service';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-form-file-input',
  templateUrl: './form-file-input.component.html',
  styleUrls: ['./form-file-input.component.scss']
})
export class FormFileInputComponent {
  @Input() type: number;

  selectedFile: ImageSnippet;

  constructor(private imageService: ImageService) { }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.imageService.storeUploadImageByTypeRequest({ image: this.selectedFile.file, type: this.type });
    });

    reader.readAsDataURL(file);
  }
}
