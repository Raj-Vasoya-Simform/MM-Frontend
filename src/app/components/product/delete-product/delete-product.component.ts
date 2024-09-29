import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedServices } from 'src/app/services/shared.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent {

  @Output() deleteProducts = new EventEmitter<any>();

  constructor(
    private sharedServices: SharedServices,   
    public dialogRef: MatDialogRef<DeleteProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private router: Router
  ){}

  deleteCategory(): void {
    this.sharedServices.deleteProduct(this.data._id).subscribe(
      (res: any) => {
        // Assuming that the response contains a token or some indicator of successful update
        // Success Message
        this.toastr.success('Product Deleted Successfully.', 'Success', {
          timeOut: 2000,
        });

        this.router.navigate(['/manage-products'])
        // Emit the form data to the parent component or elsewhere
        // this.orderSubmitted.emit(formData);

        this.dialogRef.close();
      },
      (error) => {
        console.error('Error submitting order:', error);
        // Handle the error, show a message, etc.
      }
    );
  }

  cancelDelete():void {
    this.dialogRef.close();
  }


}
