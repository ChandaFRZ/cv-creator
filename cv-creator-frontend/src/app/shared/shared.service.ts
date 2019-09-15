import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';
import { AppState } from '../store/reducers';
import { MenuRoute } from './interfaces/menu-route.interface';
import * as CoreActions from './../store/core/core.actions';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private durationInSeconds = 5;

  constructor(private snackBar: MatSnackBar, private store: Store<AppState>) { }

  openSnackBar(data: { message: string, action: string }) {
    this.snackBar.open(data.message, data.action, {
      duration: 2000,
    });
  }

  updateMenuByRoute(route: MenuRoute) {
    this.store.dispatch(CoreActions.updateActiveMenu({ activeMenuRoute: route }));
  }
}
