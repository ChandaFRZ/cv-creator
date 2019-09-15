import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressBoxComponent } from './address-box.component';

@NgModule({
  declarations: [
    AddressBoxComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    AddressBoxComponent
  ]
})
export class AddressBoxModule { }
