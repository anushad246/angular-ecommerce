import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  showFiller = false;
  @ViewChild('drawer') drawer!: MatDrawer;
  menu: any;

  toggleDrawer() {
    this.drawer.toggle();
    this.showFiller = !this.showFiller;
  }

  selectedMenuOption(selectedOpt: any) {
    this.menu = selectedOpt;
    localStorage.setItem('selectedMenu', JSON.stringify(this.menu));
  }

  ngOnInit(): void {
    const storedMenu = localStorage.getItem('selectedMenu');
    if (storedMenu) {
      this.menu = JSON.parse(storedMenu);
    }
  }
}
