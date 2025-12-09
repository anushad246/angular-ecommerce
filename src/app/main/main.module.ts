import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MAIN_ROUTES } from './main-routing.module';
import { MainComponent } from './main.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MAIN_ROUTES),
    MainComponent,
    SidenavComponent,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ],
})
export class MainModule {}
