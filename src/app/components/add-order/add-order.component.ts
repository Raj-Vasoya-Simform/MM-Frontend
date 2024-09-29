// add-order/add-order.component.ts
import { Component, ViewChild, Output, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SharedServices } from 'src/app/services/shared.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css'],
})
export class AddOrderComponent implements OnInit {
  @ViewChild('orderForm') orderForm!: NgForm;
  @Output() orderSubmitted = new EventEmitter<any>();

  // Remove unused properties
  // @ViewChild('updateOrderForm') updateOrderForm!: NgForm;
  // @Output() updateOrderSubmitted = new EventEmitter<any>();

  // Define a form group for better control over form validation
  orderFormGroup!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private orderService: SharedServices,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    // Initialize your form controls here
    this.orderFormGroup = this.formBuilder.group({
      gstNoSupplier: [''],
      idMarks: [''],
      descriptionOfGoods: [''],
      quantity: [null],
      cgstRs: [null],
      cgstRate: [''],
      tariffClassification: [''],
      sgstRs: [null],
      sgstRate: [''],
      dateTimeOfIssue: [null],
      integratedGstRs: [null],
      integratedGstRate: [''],
      natureOfProcessing: [''],
      factoryPlace: [''],
      duration: [null],
    });

    // Check if there is data passed (for updating)
    if (this.data) {
      this.setFormValues(this.data);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitOrder(): void {
    if (this.orderFormGroup.valid) {
      const formData = this.orderForm.value;
      this.orderSubmitted.emit(formData); // Emit the form data
      this.dialogRef.close();

      // Assuming you have a method in orderService to handle the API requests
      this.orderService?.storeOrder(formData)?.subscribe(
        (res: any) => {
          console.log("res : ",res)
          // Assuming that the response contains a token or some indicator of successful login

            // Success Message
            this.toastr.success('Order Created Successfully.', 'Success', {
              timeOut: 2000,
            });
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

    this.orderFormGroup.patchValue({
      gstNoSupplier: data.gstNo,
      idMarks: data.idMarks,
      descriptionOfGoods: data.descriptionOfGoods,
      quantity: data.quantity,
      cgstRs: data.cgstRs,
      cgstRate: data.cgstRate,
      tariffClassification: data.tariffClassification,
      sgstRs: data.sgstRs,
      sgstRate: data.sgstRate,
      dateTimeOfIssue: data.dateTimeOfIssue,
      integratedGstRs: data.integratedGstRs,
      integratedGstRate: data.integratedGstRate,
      natureOfProcessing: data.natureOfProcessing,
      factoryPlace: data.factoryPlace,
      duration: data.duration,
      // Populate other form fields based on your data structure
    });
  }
}
