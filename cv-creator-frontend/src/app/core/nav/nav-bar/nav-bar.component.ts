import { Component, OnInit, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/auth/auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { animationStandardEnterLeave } from 'src/app/shared/animations/animations';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  animations: [animationStandardEnterLeave()],
})

export class NavBarComponent implements OnInit {
  @Input() drawer: MatSidenav;

  isExportButtonEnabled = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      share()
    );

  constructor(private authService: AuthService, private breakpointObserver: BreakpointObserver, private router: Router) { }

  ngOnInit() {
    if (this.router.url.includes('public')) {
      this.isExportButtonEnabled = true;
    }

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && this.router.url.includes('public')) {
        this.isExportButtonEnabled = true;
        return;
      }
      this.isExportButtonEnabled = false;
    });
  }

  public signOut() {
    this.authService.signOut();
  }
}
