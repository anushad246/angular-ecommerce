import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  employeeId: string | null = null;
  employee: any = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.employeeId = params['id'];
      this.loadEmployeeDetails();
    });
  }


  private loadEmployeeDetails(): void {
    if (!this.employeeId) {
      this.isLoading = false;
      return;
    }


    setTimeout(() => {
      this.employee = {
        id: this.employeeId,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        dob: '1990-01-15',
        gender: 'Male',
        education: 'Bachelor',
        company: 'Tech Corp',
        experience: 5,
        package: 50000
      };
      this.isLoading = false;
    }, 500);
  }


  editEmployee(): void {
    this.router.navigate(['..', 'form', this.employeeId], { relativeTo: this.route });
  }


  deleteEmployee(): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      console.log('Deleting employee:', this.employeeId);
      this.router.navigate(['..', 'list'], { relativeTo: this.route });
    }
  }

  goBack(): void {
    this.router.navigate(['..', 'list'], { relativeTo: this.route });
  }
}
