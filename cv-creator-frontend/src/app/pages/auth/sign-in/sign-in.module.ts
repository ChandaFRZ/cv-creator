import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInComponent } from './sign-in.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { SpinnerModule } from 'src/app/core/components/spinners/spinner.module';
import { LogoModule } from 'src/app/core/components/logo/logo.module';
import { FooterModule } from 'src/app/core/components/footer/footer.module';
import { HeaderModule } from 'src/app/core/components/header/header.module';

@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [
    HeaderModule,
    CommonModule,
    SignInRoutingModule,
    FormsModule,
    MatAutocompleteModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    SpinnerModule,
    LogoModule,
    FooterModule
  ],
  exports: [
    SignInRoutingModule
  ]
})
export class SignInModule { }
