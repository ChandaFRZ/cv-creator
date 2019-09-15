import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { ValidationData } from 'src/app/shared/interfaces/validation-data.interface';
import { animationStandardEnterLeave } from 'src/app/shared/animations/animations';
import { NgForm } from '@angular/forms';
import * as AuthActions from './../../store/auth/auth.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  animations: [animationStandardEnterLeave()],
})
export class SettingsComponent implements OnInit {
  pageTitle: string;
  initPageTitle: string;
  currentPassword = '';
  password = '';
  passwordConfirm = '';
  errorsPassword: ValidationData[];

  pageTitle$: Observable<string>;

  samePassword: ValidationData = {
    id: 'same Password', valid: true, message: 'new password same as old password'
  };
  notEqual: ValidationData = {
    id: 'not equal', valid: true, message: 'new password and confirm data not equal'
  };

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.initPageTitle = this.pageTitle;
    this.errorsPassword = [];

    this.pageTitle$ = this.store.select(state => state.authState.user.pageTitle);
    this.pageTitle$.subscribe(
      (pageTitle: string) => {
        if (pageTitle != null) {
          this.pageTitle = pageTitle;
          this.initPageTitle = pageTitle;
        }
      });


  }

  onPublicPageSubmit(form: NgForm) {
    this.store.dispatch(AuthActions.updatePageTitleRequest({ pageTitle: form.value.pageTitle }));
  }

  onSubmitPassword() {
    if (this.errorsPassword.length <= 0) {
      console.log('submit');
    }
  }

  trackByFn(index) {
    return index;
  }

  checkLength(ref: any): boolean {
    return ref.value.length > 0;
  }
  onValidation(data: ValidationData) {
    this.newMethod(this.samePassword, this.currentPassword === this.password && this.currentPassword.length > 4);
    this.newMethod(this.notEqual, this.password !== this.passwordConfirm && this.password.length > 4);
  }

  isMultipleError(...data: ValidationData[]): boolean {
    let result = false;
    this.errorsPassword.forEach(error => {
      data.forEach(incomingError => {
        if (incomingError.id === error.id) {
          return result = true;
        }
      });
    });
    return result;
  }

  private newMethod(samePassword: ValidationData, compare: boolean) {
    if (compare) {
      const foundData = this.errorsPassword.find(item => item.id === samePassword.id);
      if (foundData === undefined) {
        this.errorsPassword.push(samePassword);
      }
    } else {
      const foundData = this.errorsPassword.find(item => item.id === samePassword.id);
      if (foundData) {
        this.errorsPassword = this.errorsPassword.filter(item => item.id !== samePassword.id);
      }
    }
  }
}
