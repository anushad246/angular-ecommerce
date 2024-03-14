import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  UntypedFormControl,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss'],
})
export class AddProductsComponent implements OnInit {
  addProductForm: FormGroup;

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

  constructor(private fb: FormBuilder, private formBuilder: FormBuilder) {}
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

  buildForm() {
    this.addProductForm = this.fb.group({
      productTitle: new FormControl(''),
      description: new FormControl(''),
      ManufacturerName: new FormControl(''),
      manufacturerBrand: new FormControl(''),
      stocks: new FormControl(''),
      price: new FormControl(''),
      discount: new FormControl(''),
      orders: new FormControl(''),
      status: new FormControl(''),
      visibility: new FormControl(''),
      productCategory: new FormControl(''),
      shortDescription: new FormControl(''),
      dateRange: new FormGroup({
        startDate: new FormControl(''),
        endDate: new FormControl(''),
      }),
      newKeyword: new FormControl(''),
    });
  }

  onSubmit() {
    console.log('Form submitted:', this.addProductForm.value);
  }

  onBackHome() {
    this.addProductForm.reset();
  }
}
