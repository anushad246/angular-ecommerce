import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JsonServiceAddEdit } from '../add-edit-server';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
})
export class AddEditComponent {
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
    private addEditJson: JsonServiceAddEdit
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
