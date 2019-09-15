import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from './directives/click-outside-directive';
import { ErrorPipe } from './pipes/error.pipe';

@NgModule({
  declarations: [
    ClickOutsideDirective,
    ErrorPipe,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ClickOutsideDirective,
    ErrorPipe,
  ]
})
export class SharedModule { }
