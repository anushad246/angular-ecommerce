import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav/sidenav.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatCardModule,
    MatIconModule,
    RouterModule,
    SidenavComponent,
  ],
})
export class MainComponent implements OnInit {
  showFiller = false;
  @ViewChild('drawer') drawer!: MatDrawer;
  menu: any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  toggleDrawer() {
    this.drawer.toggle();
    this.showFiller = !this.showFiller;
  }

  selectedMenuOption(selectedOpt: any) {
    this.menu = selectedOpt;
    localStorage.setItem('selectedMenu', JSON.stringify(this.menu));
    if (selectedOpt && selectedOpt.url) {
      const urlPath = selectedOpt.url.replace('./', '');
      this.router.navigate([urlPath], { relativeTo: this.activatedRoute });
    }
  }

  ngOnInit(): void {
    const storedMenu = localStorage.getItem('selectedMenu');
    if (storedMenu) {
      this.menu = JSON.parse(storedMenu);
    }
  }
}
