import { Component, OnInit, ViewChild } from '@angular/core';
import { JsonServiceAddEdit } from '../add-edit-server';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-emp-details',
  templateUrl: './emp-details.component.html',
  styleUrls: ['./emp-details.component.scss'],
 
})
export class EmpDetailsComponent implements OnInit {
  employeeData: any;
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'experience',
    'package',
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private jsonServiceAddEdit: JsonServiceAddEdit) {}
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
}
