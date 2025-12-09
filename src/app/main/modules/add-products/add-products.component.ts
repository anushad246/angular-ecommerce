import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { JsonService } from 'src/app/servers/server';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
  ],
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

  constructor(
    private fb: FormBuilder,
    private formBuilder: FormBuilder,
    private jsonService: JsonService
  ) {
    this.addProductForm = this.fb.group({});
  }

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
      productTitle: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(60),
        Validators.maxLength(500),
        Validators.pattern('.*\\S.*[a-zA-z0-9]'),
      ]),
      ManufacturerName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern('.*\\S.*[a-zA-z0-9]'),
      ]),
      manufacturerBrand: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern('.*\\S.*[a-zA-z0-9]'),
      ]),
      stocks: new FormControl('', [
        Validators.required,
        Validators.maxLength(9),
        Validators.pattern('^[0-9]*$'),
      ]),
      price: new FormControl('', [
        Validators.required,
        Validators.maxLength(9),
        Validators.pattern('^[0-9]*$'),
      ]),
      discount: new FormControl('', [
        Validators.required,
        Validators.maxLength(9),
        Validators.pattern('^[0-9]*$'),
      ]),
      orders: new FormControl('', [
        Validators.required,
        Validators.maxLength(9),
        Validators.pattern('^[0-9]*$'),
      ]),
      status: new FormControl(this.published[0].value, []),
      visibility: new FormControl(this.visibility[0].value, []),
      productCategory: new FormControl(this.productCategory[0].value, []),
      shortDescription: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(150),
        Validators.pattern('.*\\S.*[a-zA-z0-9]'),
      ]),
      dateRange: new FormGroup({
        startDate: new FormControl(''),
        endDate: new FormControl(''),
      }),
      newKeyword: new FormControl(this.keywords),
    });
  }

  get productTitle() {
    return this.addProductForm.get('productTitle');
  }

  get description() {
    return this.addProductForm.get('description');
  }

  get ManufacturerName() {
    return this.addProductForm.get('ManufacturerName');
  }

  get manufacturerBrand() {
    return this.addProductForm.get('manufacturerBrand');
  }

  get stocks() {
    return this.addProductForm.get('stocks');
  }

  get price() {
    return this.addProductForm.get('price');
  }

  get discount() {
    return this.addProductForm.get('discount');
  }

  get orders() {
    return this.addProductForm.get('orders');
  }

  get status() {
    return this.addProductForm.get('status');
  }

  get visibilitys() {
    return this.addProductForm.get('visibility');
  }

  get productCategorys() {
    return this.addProductForm.get('productCategory');
  }

  get shortDescription() {
    return this.addProductForm.get('shortDescription');
  }

  onSubmit() {
    if (this.addProductForm.valid) {
      let addProduct = {
        productTitle: this.addProductForm.value['productTitle'],
        description: this.addProductForm.value['description'],
        ManufacturerName: this.addProductForm.value['ManufacturerName'],
        manufacturerBrand: this.addProductForm.value['manufacturerBrand'],
        stocks: this.addProductForm.value['stocks'],
        orders: this.addProductForm.value['orders'],
        price: this.addProductForm.value['price'],
        discount: this.addProductForm.value['discount'],
        productCategory: this.addProductForm.value['productCategory'],
        visibility: this.addProductForm.value['visibility'],
        status: this.addProductForm.value['status'],
        shortDescription: this.addProductForm.value['shortDescription'],
        newKeyword: this.addProductForm.value[' newKeyword'],
        dateRange: this.addProductForm.value['dateRange'],
      };
      this.jsonService.AddProduct(addProduct).subscribe((res) => {
        if (res) {
          this.onBackHome();
        }
      });
      console.log(addProduct, 'valid form details');
    }
  }

  onBackHome() {
    this.addProductForm.reset();
  }
}
