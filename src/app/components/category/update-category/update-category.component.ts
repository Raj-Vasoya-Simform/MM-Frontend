import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedServices } from 'src/app/services/shared.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  @ViewChild('categoryForm') categoryForm!: NgForm;
  @Output() categorySubmitted = new EventEmitter<any>();

  // Define a form group for better control over form validation
  categoryFormGroup!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpdateCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private orderService: SharedServices,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize your form controls here
    this.categoryFormGroup = this.formBuilder.group({
      name: [''],
      status: [''],
    });


  if (this.data) {
    this.setFormValues(this.data);
  }
}

submitCategory(): void {
  if (this.categoryFormGroup.valid) {
    const formData = this.categoryForm.value;
    this.categorySubmitted.emit(formData); // Emit the form data

    // Assuming you have a method in orderService to handle the API requests
    this.orderService?.updateCategory(this.data._id, formData)?.subscribe(
      
      (res: any) => {
        // Assuming that the response contains a token or some indicator of successful update
        // Success Message
        this.toastr.success('Category Updated Successfully.', 'Success', {
          timeOut: 2000,
        });

        this.router.navigate(['/manage-categories'])
        // window.location.reload();

        // Emit the form data to the parent component or elsewhere
        this.categorySubmitted.emit(formData);

        this.dialogRef.close();
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

setFormValues(data: any): void {
  this.categoryFormGroup.patchValue({
    name: data.name,
    status: data.status
    });
}
}
