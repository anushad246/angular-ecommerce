import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
  employeeForm!: FormGroup;
  isEditMode = false;
  employeeId: string | null = null;
  isLoading = false;

  qualifications = [
    'High School',
    'Diploma',
    'Intermediate',
    'Bachelor',
    'Master',
    'PhD'
  ];

  genders = ['Male', 'Female', 'Other'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.checkIfEditMode();
  }


  private initializeForm(): void {
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      education: ['', Validators.required],
      company: ['', Validators.required],
      experience: ['', [Validators.required, Validators.min(0)]],
      package: ['', [Validators.required, Validators.min(0)]]
    });
  }


  private checkIfEditMode(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.employeeId = params['id'];
        this.isEditMode = true;
        this.loadEmployeeData();
      }
    });
  }

 
  private loadEmployeeData(): void {
    if (!this.employeeId) return;
    

    
    console.log('Loading employee with ID:', this.employeeId);
  }


  onSubmit(): void {
    if (!this.employeeForm.valid) {
      console.log('Form is invalid');
      return;
    }

    this.isLoading = true;

    const formData = this.employeeForm.value;

    if (this.isEditMode && this.employeeId) {
      // Update employee
      // this.store.dispatch(EmployeeActions.updateEmployee({
      //   id: this.employeeId,
      //   employee: formData
      // }));
      console.log('Updating employee:', formData);
    } else {
      // Create new employee
      // this.store.dispatch(EmployeeActions.addEmployee({ employee: formData }));
      console.log('Adding new employee:', formData);
    }

    // Simulate async operation
    setTimeout(() => {
      this.isLoading = false;
      alert(this.isEditMode ? 'Employee updated successfully' : 'Employee added successfully');
      this.router.navigate(['..', 'list'], { relativeTo: this.route });
    }, 1000);
  }


  resetForm(): void {
    this.employeeForm.reset();
  }


  cancel(): void {
    this.router.navigate(['..', 'list'], { relativeTo: this.route });
  }


  get f() {
    return this.employeeForm.controls;
  }
}
