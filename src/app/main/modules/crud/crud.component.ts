import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.scss',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
})
export class CrudComponent {

}
