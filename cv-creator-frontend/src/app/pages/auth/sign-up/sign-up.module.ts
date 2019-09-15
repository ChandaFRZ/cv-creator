import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignUpRoutingModule } from './sign-up-routing.module';
import { SignUpComponent } from './sign-up.component';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { SpinnerModule } from 'src/app/core/components/spinners/spinner.module';
import { LogoModule } from 'src/app/core/components/logo/logo.module';
import { FooterModule } from 'src/app/core/components/footer/footer.module';
import { HeaderModule } from 'src/app/core/components/header/header.module';

@NgModule({
  declarations: [
    SignUpComponent
  ],
  imports: [
    HeaderModule,
    CommonModule,
    SignUpRoutingModule,
    FormsModule,
    MatAutocompleteModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    SpinnerModule,
    LogoModule,
    FooterModule,
  ],
  exports: [
    SignUpRoutingModule
  ]
})
export class SignUpModule { }
