// add-order/update-order.component.ts
import { Component, ViewChild, Output, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SharedServices } from 'src/app/services/shared.service';

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.css']
})
export class UpdateOrderComponent implements OnInit {
  @ViewChild('orderForm') orderForm!: NgForm;
  @Output() orderSubmitted = new EventEmitter<any>();

  // Define a form group for better control over form validation
  orderFormGroup!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpdateOrderComponent>,
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
      status: [''],
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

      // Assuming you have a method in orderService to handle the API requests
      this.orderService?.updateOrder(this.data._id, formData)?.subscribe(
        
        (res: any) => {
          // Assuming that the response contains a token or some indicator of successful update
          // Success Message
          this.toastr.success('Order Updated Successfully.', 'Success', {
            timeOut: 2000,
          });
          // window.location.reload();

          // Emit the form data to the parent component or elsewhere
          this.orderSubmitted.emit(formData);

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
    this.orderFormGroup.patchValue({
      gstNoSupplier: data.gstNoSupplier,
      idMarks: data.idMarks,
      descriptionOfGoods: data.description,
      quantity: data.quantity,
      cgstRs: data.calCgst,
      cgstRate: data.rofCgst,
      tariffClassification: data.trafficClassification,
      sgstRs: data.calSgst,
      sgstRate: data.rofSgst,
      dateTimeOfIssue: new Date(data.order_date),
      integratedGstRs: data.calIgst,
      integratedGstRate: data.rofIgst,
      natureOfProcessing: data.natureOfProcessing,
      factoryPlace: data.address,
      duration: data.duration,
      status: data.status,
      // Add other form fields based on your data structure
    });
  }
}
