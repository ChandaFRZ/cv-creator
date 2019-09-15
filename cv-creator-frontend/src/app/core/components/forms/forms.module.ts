import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormFileInputComponent } from './form-file-input/form-file-input.component';
import { FormTextareaComponent } from './form-textarea/form-textarea.component';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import { FormInputFieldActionComponent } from './form-input-field-action/form-input-field-action.component';
import { FormInputFieldComponent } from './form-input-field/form-input-field.component';
import { FormInputFieldDirective } from './form-input-field/form-input-field.directive';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    FormFileInputComponent,
    FormInputFieldActionComponent,
    FormTextareaComponent,
    FormInputFieldComponent,
    FormInputFieldDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    TextareaAutosizeModule,
    SharedModule,
  ],
  exports: [
    FormFileInputComponent,
    MatFormFieldModule,
    FormInputFieldActionComponent,
    FormTextareaComponent,
    FormInputFieldComponent,
    FormInputFieldDirective
  ]
})
export class CustomFormsModule { }
