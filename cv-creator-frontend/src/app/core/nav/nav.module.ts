import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainNavComponent } from './main-nav/main-nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { SideNavComponent } from './side-nav/side-nav.component';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material';
import { ExportButtonModule } from '../components/export-button/export-button.module';
import { ProgressBarModule } from '../components/progress-bar/progress-bar.module';

@NgModule({
  declarations: [
    MainNavComponent,
    NavBarComponent,
    SideNavComponent
  ],
  imports: [
    CommonModule,
    ExportButtonModule,
    MatToolbarModule,
    MatButtonModule,
    MatDividerModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatSnackBarModule,
    RouterModule,
    ProgressBarModule
  ],
  exports: [
    MainNavComponent,
    NavBarComponent,
    SideNavComponent
  ]
})
export class NavModule { }
