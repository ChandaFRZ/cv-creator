import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { MatSidenav } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { Router, NavigationEnd } from '@angular/router';
import { MenuRoute } from 'src/app/shared/interfaces/menu-route.interface';
import { SubSink } from 'subsink';
import { PlatformLocation } from '@angular/common';
import { DeviceDetectorService } from 'ngx-device-detector';
import * as CoreActions from './../../../store/core/core.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnDestroy {
  @Input() drawer: MatSidenav;
  activatedRoute$: Observable<MenuRoute>;

  menuRoutes: MenuRoute[];

  private subs = new SubSink();

  constructor(private authService: AuthService,
              private store: Store<AppState>,
              private router: Router,
              private platformLocation: PlatformLocation,
              private deviceService: DeviceDetectorService) {
  }

  ngOnInit() {
    this.activatedRoute$ = this.store.select(state => state.coreState.activeMenuRoute);

    this.subs.add(this.store.select(state => state.authState.user).subscribe(
      user => {
        if (user != null && user.pageTitle != null) {
          const host = this.platformLocation.hostname + ':' + this.platformLocation.port + '/';
          this.store.dispatch(CoreActions.updatePublicPages({ pageTitle: user.pageTitle, host }));
        }
      },
      error => console.warn(error)
    ));

    this.subs.add(this.store.select(state => state.coreState.menuRoutes).subscribe(
      menuRoutes => this.menuRoutes = menuRoutes
    ));

    this.subs.add(this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.menuRoutes.map(route => {
          if (event.url.includes(route.route)) {
            this.store.dispatch(CoreActions.updateActiveMenu({ activeMenuRoute: route }));
          }
        });
      }
    }));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  handleLink(route: MenuRoute) {
    if (route.isExternal) {
      console.log(route.route);
      window.open(route.route, '_blank');
    } else {
      this.router.navigate([route.route]);
    }
    if (this.deviceService.device !== ('Unknown')) {
      this.drawer.close();
    }
  }

  signOut() {
    this.authService.signOut();
  }
}
