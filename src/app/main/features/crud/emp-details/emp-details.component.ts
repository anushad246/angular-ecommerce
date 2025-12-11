import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { JsonServiceAddEdit } from '../add-edit-server';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-emp-details',
  templateUrl: './emp-details.component.html',
  styleUrl: './emp-details.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule
  ]
})
export class EmpDetailsComponent implements OnInit {
  employeeData: any;
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'gender',
    'education',
    'company',
    "action"
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private jsonServiceAddEdit: JsonServiceAddEdit) {
    this.dataSource = new MatTableDataSource();
  }
  ngOnInit() {
    this.getemapdata();
  }
  getemapdata() {
    this.jsonServiceAddEdit.getEmpData().subscribe({
      next: (res) => {
        this.employeeData = res;
        this.dataSource = new MatTableDataSource(this.employeeData)
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
      },
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmpData(id: any){
    this.jsonServiceAddEdit.getEmpDelete(id).subscribe({
      next: (res) => {
        console.log(res, "delete api response")
        alert("employee deleted")
        this.getemapdata();
      },
      error: console.log
    })
  }
}
