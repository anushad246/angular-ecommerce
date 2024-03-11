import { Component } from '@angular/core';
import {MENU_CONFIG} from "./menu-config"

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  showFiller = false;
  menuList = MENU_CONFIG;

  getCurrentNav(navOpt:any){
    console.log(navOpt, "current menu item")
  }
}
