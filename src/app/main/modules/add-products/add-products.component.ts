import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import {
  Validators,
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss'],
})
export class AddProductsComponent implements OnInit {
  addProductForm!: FormGroup;

  keywords = ['angular', 'how-to', 'tutorial', 'accessibility'];
  published = [
    { value: 'draft', viewValue: 'Draft' },
    { value: 'published', viewValue: 'Published' },
    { value: 'scheduled', viewValue: 'Scheduled' },
  ];

  visibility = [
    { value: 'hidden', viewValue: 'Hidden' },
    { value: 'public', viewValue: 'Public' },
  ];

  productCategory = [
    { value: 'appliances', viewValue: 'Appliances' },
    { value: 'automotiveAccessories', viewValue: 'Automotive Accessories' },
    { value: 'electronics', viewValue: 'Electronics' },
    { value: 'fashion', viewValue: 'Fashion' },
    { value: 'furniture', viewValue: 'Furniture' },
    { value: 'grocery', viewValue: 'Grocery' },
    { value: 'kids', viewValue: 'Kids' },
    { value: 'watches', viewValue: 'Watches' },
  ];

  constructor(private fb: FormBuilder) {}
  selectedFood = this.published[0].value;
  selectedVisibility = this.visibility[0].value;
  selectedProductCategory = this.productCategory[0].value;

  removeKeyword(keyword: string) {
    const index = this.keywords.indexOf(keyword);
    if (index >= 0) {
      this.keywords.splice(index, 1);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.keywords.push(value);
    }
    event.chipInput!.clear();
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.addProductForm = this.fb.group({
      brandName: [
        '',
        [
          Validators.required,
          Validators.minLength(20),
          Validators.maxLength(50),
        ],
      ],
    });
  }

  get brandNameControl(): UntypedFormControl {
    return this.addProductForm.get('brandName') as UntypedFormControl;
  }

  errors = {
    brandName: '',
  };



  formValidationMessages = {

    brandName: {
      required: 'Brand Title is required.',
      maxlength: 'Max Length should be 50',
      minlength: 'Min Length should be 20',
    },


  };

  onSubmit() {
    console.log('Form submitted:', this.addProductForm.value);
  }

  onBackHome(){
    
  }
}
