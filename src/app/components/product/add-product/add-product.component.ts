import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SharedServices } from 'src/app/services/shared.service';
import { Router } from '@angular/router';
import { AddCategoryComponent } from '../../category/add-category/add-category.component';
import { AddOrderService } from 'src/app/services/add-order.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  @ViewChild('productForm') productForm!: NgForm;
  @Output() productSubmitted = new EventEmitter<any>();

  @ViewChild('categoryForm') categoryForm!: NgForm;
  @Output() categorySubmitted = new EventEmitter<any>();

  categoryFormGroup!: FormGroup;

  productFormGroup!: FormGroup;
  categories: any[] = []; // Store fetched categories
  selectedCategoryId: string = ''; // Store selected category ID

  constructor(
    public dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private productService: SharedServices,
    private formBuilder: FormBuilder,
    private router: Router,
    public categoryDialogRef: MatDialogRef<AddCategoryComponent>,
    private categoryService: SharedServices,
    private addCategoryService: AddOrderService,
  ){}

  ngOnInit(): void {

    this.categoryFormGroup = this.formBuilder.group({
      name: [''],
      status: ['']
    });

    this.productFormGroup = this.formBuilder.group({
      name: [''],
      qty: [''],
      price: [''],
      description: [''],
      category_id: ['']
    });

    this.loadCategories();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  loadCategories(): void {
    this.productService.getEnabledCategories().subscribe(
      (res: any) => {
        this.categories = res.data;
      },
      (error: any) => {
        console.error('Error fetching orders:', error);
        // Handle error gracefully, e.g., show a user-friendly message
      }
    );
  }

  submitProduct(): void {
    if (this.productFormGroup.valid) {
      const formData = this.productForm.value;
      this.productSubmitted.emit(formData); // Emit the form data
      this.dialogRef.close();

      // Assuming you have a method in orderService to handle the API requests
      this.productService?.storeProduct(formData)?.subscribe(
        (res: any) => {

            // Success Message
            this.toastr.success('Product Created Successfully.', 'Success', {
              timeOut: 2000,
            });

                    // Reload the page
        window.location.reload();

            this.router.navigate(['/manage-products'])
        },
        (error) => {
          console.error('Error submitting order:', error);
          // Handle the error, show a message, etc.
        }
      );
    } else {
      // Warning for validation.
      this.toastr.warning('Please enter valid data.');
    }
  }

  addNewCategory(): void {
    // if (this.categoryFormGroup.valid) {
    //   const formData = this.categoryForm.value;
    //   this.categorySubmitted.emit(formData); // Emit the form data
    //   this.categoryDialogRef.close();

    //   // Assuming you have a method in orderService to handle the API requests
    //   this.categoryService?.storeCategory(formData)?.subscribe(
    //     (res: any) => {

    //         // Success Message
    //         this.toastr.success('Category Created Successfully.', 'Success', {
    //           timeOut: 2000,
    //         });
    //         this.router.navigate(['/manage-categories'])
    //     },
    //     (error) => {
    //       console.error('Error submitting order:', error);
    //       // Handle the error, show a message, etc.
    //     }
    //   );
    // } else {
    //   // Warning for validation.
    //   this.toastr.warning('Please enter valid data.');
    // }
    this.addCategoryService.openAddCategoryDialog();
    this.dialogRef.close();
  }

}
