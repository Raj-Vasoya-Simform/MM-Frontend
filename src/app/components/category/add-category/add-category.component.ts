import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SharedServices } from 'src/app/services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit{
  @ViewChild('categoryForm') categoryForm!: NgForm;
  @Output() categorySubmitted = new EventEmitter<any>();

  categoryFormGroup!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private categoryService: SharedServices,
    private formBuilder: FormBuilder,
    private router: Router,
  ){}

  ngOnInit(): void {

    this.categoryFormGroup = this.formBuilder.group({
      name: [''],
      status: ['']
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitCategory(): void {
    if (this.categoryFormGroup.valid) {
      const formData = this.categoryForm.value;
      this.categorySubmitted.emit(formData); // Emit the form data
      this.dialogRef.close();

      // Assuming you have a method in orderService to handle the API requests
      this.categoryService?.storeCategory(formData)?.subscribe(
        (res: any) => {

            // Success Message
            this.toastr.success('Category Created Successfully.', 'Success', {
              timeOut: 2000,
            });
            this.router.navigate(['/manage-categories'])
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

}
