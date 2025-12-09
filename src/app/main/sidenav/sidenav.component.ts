import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MENU_CONFIG } from './menu-config';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  standalone: true,
  imports: [CommonModule],
})
export class SidenavComponent implements OnInit {

  showFiller = false;
  menuList = MENU_CONFIG;
  selectedMEnu: any;
  @Output() selectedMenuOption: EventEmitter<any> = new EventEmitter();

  getCurrentNav(navOpt: any) {
    this.selectedMEnu = navOpt;
    this.selectedMenuOption.emit(this.selectedMEnu);
  }

  ngOnInit(): void {}

}
