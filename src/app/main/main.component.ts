import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
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
  }

  ngOnInit(): void {}
}
