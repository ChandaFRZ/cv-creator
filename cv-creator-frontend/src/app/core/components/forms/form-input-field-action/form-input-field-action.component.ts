import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { animationEnterTranslateLeft } from 'src/app/shared/animations/animations';
import { EventEmitData } from 'src/app/shared/interfaces/event-emit-data.interface';

@Component({
  selector: 'app-form-input-field-action',
  templateUrl: './form-input-field-action.component.html',
  styleUrls: ['./form-input-field-action.component.scss'],
  animations: [animationEnterTranslateLeft()]
})
export class FormInputFieldActionComponent implements OnInit {
  @Input() placeholder = 'content';
  @Input() entityId;
  @Input() content = '';
  @Input() tabindex = true;
  @Input() type = 'text';
  @Input() bold = false;
  @Input() isDeleteButtonHidden = false;
  @Input() isEditDisabled = false;


  @Output() focusEvent = new EventEmitter();
  @Output() blurEvent = new EventEmitter<EventEmitData>();
  @Output() changeEvent = new EventEmitter<EventEmitData>();
  @Output() deleteEvent = new EventEmitter<EventEmitData>();
  @Output() submitEvent = new EventEmitter<EventEmitData>();

  isFocused = false;
  isMousDown = false;
  initContent = '';

  constructor() { }

  @HostListener('mousedown', ['$event']) onMouseDown(event) {
    setTimeout(() => {
      this.isMousDown = true;
    }, 100);
  }

  @HostListener('mouseup') onMouseUp() {
    setTimeout(() => {
      this.isMousDown = false;
    }, 100);
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (this.content !== this.initContent) {
      this.content = this.initContent;
    }
  }


  ngOnInit() {
    this.initContent = this.content;
  }

  onSubmit(form: NgForm) {
    this.submitEvent.emit(this.createEmitData(form.value.content));
    this.initContent = this.content;
  }

  onDelete() {
    this.deleteEvent.emit(this.createEmitData());
  }

  onChange(event) {
    this.changeEvent.emit(this.createEmitData(event));
  }

  onFocus() {
    this.isFocused = true;
    this.focusEvent.emit(this.createEmitData());
  }

  onBlur() {
    setTimeout(() => {
      this.isFocused = false;
      this.content = this.initContent;
      this.blurEvent.emit(this.createEmitData());
    }, 200);
  }

  private createEmitData(content?: number | string): EventEmitData {
    const data: EventEmitData = { id: this.entityId, content };
    return data;
  }
}
