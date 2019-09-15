import { Component, OnInit } from '@angular/core';
import { animationStandardEnterLeave } from 'src/app/shared/animations/animations';
// import html2canvas from 'html2canvas';
// import * as jspdf from 'jspdf';

@Component({
  selector: 'app-export-button',
  templateUrl: './export-button.component.html',
  styleUrls: ['./export-button.component.scss']
})
export class ExportButtonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onExport() {
    /*
    const data = document.getElementById('export-content');
    html2canvas(data).then(canvas => {

      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4');
      const position = 0;
      pdf.addImage(contentDataURL, 'PDF', 0, position, imgWidth, imgHeight);
      pdf.save('personal-cv.pdf');
    });
    */
  }
}
