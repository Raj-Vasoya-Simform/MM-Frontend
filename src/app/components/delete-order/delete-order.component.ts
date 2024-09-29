import { Component, EventEmitter, Output, Inject } from '@angular/core';
import { SharedServices } from '../../services/shared.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'; // Import MatDialog
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-order',
  templateUrl: './delete-order.component.html',
  styleUrls: ['./delete-order.component.css']
})
export class DeleteOrderComponent {
  @Output() deleteOrders = new EventEmitter<any>();

  constructor(
    private sharedServices: SharedServices,   
    public dialogRef: MatDialogRef<DeleteOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private router: Router
    ) {}

  deleteOrder(): void {
    this.sharedServices.deleteOrder(this.data._id).subscribe(
      (res: any) => {
        // Assuming that the response contains a token or some indicator of successful update
        // Success Message
        this.toastr.success('Order Deleted Successfully.', 'Success', {
          timeOut: 2000,
        });

        this.router.navigate(['/manage-orders'])
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
