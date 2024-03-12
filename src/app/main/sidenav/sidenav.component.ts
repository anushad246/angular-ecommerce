import { Component, OnInit } from '@angular/core';
import { MENU_CONFIG } from './menu-config';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {

  showFiller = false;
  menuList = MENU_CONFIG;
  selectedMEnu:any
  @Output() selectedMenuOption: EventEmitter<any> = new EventEmitter();

  getCurrentNav(navOpt: any) {
    this.selectedMEnu = navOpt
    this.selectedMenuOption.emit(this.selectedMEnu);
  }

  ngOnInit(): void {}

}
