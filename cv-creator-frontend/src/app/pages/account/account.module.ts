import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { CustomFormsModule } from 'src/app/core/components/forms/forms.module';
import { CvComponentsModule } from 'src/app/cv-components/cv-components.module';
import {
  MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule
} from '@angular/material';
import { AccountComponent } from './account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AccountComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    CvComponentsModule,
    AccountRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [
    AccountComponent,
  ]
})
export class AccountModule { }
