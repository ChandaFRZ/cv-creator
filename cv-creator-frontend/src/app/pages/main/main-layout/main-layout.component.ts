import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { selectLastModifiedDate } from 'src/app/store/auth/auth.selectors';
import * as AuthActions from './../../../store/auth/auth.actions';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {

  modifiedDate$ = this.store.select(selectLastModifiedDate);
  address$ = this.store.select(state => state.addresState.address);

  constructor(private store: Store<AppState>) { }

  onQuit() {
    this.store.dispatch(AuthActions.signOutReqeust());
  }
}
