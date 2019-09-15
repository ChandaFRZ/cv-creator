import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-spinner-ripple',
  templateUrl: './spinner-ripple.component.html',
  styleUrls: ['./spinner-ripple.component.scss']
})
export class SpinnerRippleComponent implements OnInit {
  @Input() isActive = true;

  constructor() { }

  ngOnInit() {
  }
}
