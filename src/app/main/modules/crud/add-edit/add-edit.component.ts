import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JsonServiceAddEdit } from '../add-edit-server';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
})
export class AddEditComponent implements OnInit {
  userId: string;
  empForm: FormGroup;
  qualification = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];
  constructor(
    private _fb: FormBuilder,
    private addEditJson: JsonServiceAddEdit,
    private route: ActivatedRoute
  ) {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: '',
    });
  }

  ngOnInit(): void {
  this.route.params.subscribe(params => {
    this.userId = params['id'];
    console.log('User ID:', this.userId);
  });
}

  onForSubmite() {
    if (this.empForm.valid) {
      this.addEditJson.AddEdit(this.empForm.value).subscribe((res) => {
        this.formReset();
        alert('employee added successfully');
      });
    }
  }

  formReset() {
    this.empForm.reset();
  }
}


// userId: string;

// constructor(private route: ActivatedRoute) { }

// ngOnInit(): void {
//   this.route.params.subscribe(params => {
//     this.userId = params['id'];
//     console.log('User ID:', this.userId);
//   });
// }