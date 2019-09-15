import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { SpinnerModule } from 'src/app/core/components/spinners/spinner.module';
import { ProgressBarModule } from 'src/app/core/components/progress-bar/progress-bar.module';

@NgModule({
  declarations: [
    PublicComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SpinnerModule,
    ProgressBarModule
  ]
})
export class PublicModule { }
