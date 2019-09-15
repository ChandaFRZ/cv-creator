import { Component, OnInit } from '@angular/core';
import { ProgressBarService } from './progress-bar.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {
  bufferValue = 20;

  constructor(public progressionBarService: ProgressBarService) { }

  ngOnInit() {
    this.progressionBarService.isEnabled$.subscribe();
    this.progressionBarService.currentProgressionValue$.subscribe();
  }
}
