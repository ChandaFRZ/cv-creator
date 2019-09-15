import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoBarComponent } from './logo-bar/logo-bar.component';
import { MatTooltipModule } from '@angular/material';

@NgModule({
  declarations: [
    LogoBarComponent
  ],
  imports: [
    CommonModule,
    MatTooltipModule,
  ],
  exports: [
    LogoBarComponent
  ]
})
export class LogoModule { }
