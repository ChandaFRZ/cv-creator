import { Directive, ElementRef, Input, ViewChild, ChangeDetectorRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormInputFieldComponent } from 'src/app/core/components/forms/form-input-field/form-input-field.component';
import { ValidationData } from 'src/app/shared/interfaces/validation-data.interface';

@Directive({
  selector: '[appFormInputField]',
})
export class FormInputFieldDirective implements AfterViewInit {
  @Input() updateText = '';
  @Input() displayError = true;
  @Output() inputEvent = new EventEmitter<string>();
  @Output() validationEvent = new EventEmitter<ValidationData>();
  constructor(private inputRef: FormInputFieldComponent, private ref: ElementRef) {
  }

  ngAfterViewInit(): void {
    this.ref.nativeElement.querySelector('input')
      .addEventListener('input', this.onInput.bind(this));
  }

  private onInput(event) {
    if (this.displayError) {
      this.inputRef.errorMessage = event.target.validationMessage;
    }

    this.inputEvent.emit(event.target.value);
    this.validationEvent.emit({
      id: this.inputRef.placeholder,
      valid: event.target.validity.valid,
      message: event.target.validationMessage
    });
  }
}
