import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerRippleComponent } from './spinner-ripple/spinner-ripple.component';

@NgModule({
  declarations: [
    SpinnerRippleComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SpinnerRippleComponent
  ]
})
export class SpinnerModule { }
