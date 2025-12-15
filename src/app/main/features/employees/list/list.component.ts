import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'gender',
    'education',
    'company',
    'actions'
  ];

  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadEmployees();
  }


  loadEmployees(): void {

    
    const mockData = [
      { id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', gender: 'Male', education: 'Bachelor', company: 'Tech Corp' },
      { id: '2', firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', gender: 'Female', education: 'Master', company: 'Tech Corp' }
    ];
    
    this.dataSource = new MatTableDataSource(mockData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

 
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

 
  editEmployee(id: string): void {
    this.router.navigate(['..', 'form', id], { relativeTo: null });
  }


  viewDetails(id: string): void {
    this.router.navigate(['..', 'details', id], { relativeTo: null });
  }


  deleteEmployee(id: string): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      // this.store.dispatch(EmployeeActions.deleteEmployee({ id }));
      this.loadEmployees(); // Refresh list
    }
  }
}
