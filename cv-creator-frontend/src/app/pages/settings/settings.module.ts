import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'src/app/core/components/forms/forms.module';
import { CvComponentsModule } from 'src/app/cv-components/cv-components.module';
import { MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    CvComponentsModule,
    SettingsRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    SharedModule,
  ],
  exports: [
    SettingsComponent
  ]
})
export class SettingsModule { }
