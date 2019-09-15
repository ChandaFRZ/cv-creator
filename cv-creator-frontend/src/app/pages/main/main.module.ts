import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { CvComponentsModule } from 'src/app/cv-components/cv-components.module';
import { CustomFormsModule } from 'src/app/core/components/forms/forms.module';

@NgModule({
  declarations: [
    MainLayoutComponent
  ],
  imports: [
    CommonModule,
    CustomFormsModule,
    CvComponentsModule,
    MainRoutingModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class MainModule { }
