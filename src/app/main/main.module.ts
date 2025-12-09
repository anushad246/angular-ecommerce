import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MAIN_ROUTES } from './main-routing.module';
import { MainComponent } from './main.component';

@NgModule({
  imports: [
    RouterModule.forChild(MAIN_ROUTES),
    MainComponent,
  ],
})
export class MainModule {}
