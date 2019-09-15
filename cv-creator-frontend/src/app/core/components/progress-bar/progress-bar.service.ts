import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {

  isEnabled$ = new Subject<boolean>();
  currentProgressionValue$ = new Subject<number>();

  constructor() {
  }

  updateStateEnabled(isEnabled: boolean) {
    this.isEnabled$.next(isEnabled);
  }

  updateProgressionValue(newValue: number) {
    this.currentProgressionValue$.next(newValue);
  }
}
