import { Component, OnInit, Input, Output, EventEmitter, ViewChild, Renderer2, ElementRef, HostBinding } from '@angular/core';

@Component({
  selector: 'app-form-input-field',
  templateUrl: './form-input-field.component.html',
  styleUrls: ['./form-input-field.component.scss']
})
export class FormInputFieldComponent implements OnInit {
  @Input() content = 'content text';
  @Input() placeholder = 'placeholder text';
  @Input() disabled = false;
  @Input() type = 'text';
  @Input() autoComplete = 'off';
  @Input() errorMessage = '';
  @Input() minLength = 4;
  @Input() required = true;
  @Input() multipleErrors = false;

  @Output() inputEvent = new EventEmitter<string>();

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
  }

  onInput() {
    this.inputEvent.emit(this.content);
  }
}
