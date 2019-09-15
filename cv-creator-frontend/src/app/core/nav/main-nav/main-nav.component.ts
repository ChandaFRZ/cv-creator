import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, share } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { SubSink } from 'subsink';
import { EntityServices } from '@ngrx/data';
import { AddressService } from 'src/app/cv-components/address-box/address.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit, OnDestroy {
  @ViewChild('drawer', { static: true }) sideNav: MatSidenav;

  isOpened = false;
  isLoggedIn$ = this.store.select(state => state.authState.isLoggedIn);
  isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      share()
    );

  subs = new SubSink();

  constructor(private entityServices: EntityServices,
              private breakpointObserver: BreakpointObserver,
              private store: Store<AppState>,
              private addressService: AddressService) {
  }

  ngOnInit() {
    this.subs.add(this.breakpointObserver.observe(Breakpoints.Handset)
      .subscribe(data => {
        this.isLoggedIn$.subscribe(
          isLoggedIn => this.isOpened = isLoggedIn && data.matches === false,
          error => console.warn(error)
        );
      }));

    const sub = this.isLoggedIn$.subscribe(
      isLoggedIn => {
        if (isLoggedIn) {
          this.addressService.storeLoadRequest();
          this.entityServices.getEntityCollectionService('Experience').getAll();
          this.entityServices.getEntityCollectionService('Hobby').getAll();
          this.entityServices.getEntityCollectionService('Knowledge').getAll();
          this.entityServices.getEntityCollectionService('Progression').getAll();
          this.entityServices.getEntityCollectionService('Image').getAll();
          sub.unsubscribe();
        }
      }
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
