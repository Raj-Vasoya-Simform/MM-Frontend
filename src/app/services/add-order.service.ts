// add-order.service.ts
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddOrderComponent } from '../components/add-order/add-order.component';
import { UpdateOrderComponent } from '../components/update-order/update-order.component';
import { DeleteOrderComponent } from '../components/delete-order/delete-order.component';
import { AddCategoryComponent } from '../components/category/add-category/add-category.component';
import { UpdateCategoryComponent } from '../components/category/update-category/update-category.component';
import { DeleteCategoryComponent } from '../components/category/delete-category/delete-category.component';
import { AddProductComponent } from '../components/product/add-product/add-product.component';
import { UpdateProductComponent } from '../components/product/update-product/update-product.component';
import { DeleteProductComponent } from '../components/product/delete-product/delete-product.component';
import { ViewCategoryComponent } from '../components/category/view-category/view-category.component';

@Injectable({
  providedIn: 'root',
})
export class AddOrderService {
  constructor(private dialog: MatDialog) {}

  openAddOrderDialog(): void {
    const dialogRef = this.dialog.open(AddOrderComponent, {
      width: '1100px',
    });

    dialogRef.componentInstance.orderSubmitted.subscribe((formData: any) => {
      // Add additional logic to handle the form data if needed
    });

    dialogRef.afterClosed();;
  }

  openUpdateOrderDialog(row: any): void {
    const dialogRef = this.dialog.open(UpdateOrderComponent, {
      width: '1100px',
      data: row,
    });

    dialogRef.componentInstance.orderSubmitted.subscribe((formData: any) => {
      // Add additional logic to handle the form data if needed
    });

    dialogRef.afterClosed();
  }

  openDeleteOrderDialog(row: any): void {
    const dialogRef = this.dialog.open(DeleteOrderComponent, {
      width: '400px',
      data: row,
    });

    dialogRef.componentInstance.deleteOrders.subscribe((formData: any) => {
      // Add additional logic to handle the form data if needed
    });

    dialogRef.afterClosed();;
  }

  openViewCategoryDialog(row: any): void {
    const dialogRef = this.dialog.open(ViewCategoryComponent, {
      width: '300px',
      data: row,
    });

    dialogRef.componentInstance.viewCategroy.subscribe((formData: any) => {
      // Add additional logic to handle the form data if needed
    });

    dialogRef.afterClosed();;
  }

  openAddCategoryDialog(): void {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '300px',
    });

    dialogRef.componentInstance.categorySubmitted.subscribe((formData: any) => {
      // Add additional logic to handle the form data if needed
    });

    dialogRef.afterClosed();;
  }

  openUpdateCategoryDialog(row: any): void {
    const dialogRef = this.dialog.open(UpdateCategoryComponent, {
      width: '300px',
      data: row,
    });

    dialogRef.componentInstance.categorySubmitted.subscribe((formData: any) => {
      // Add additional logic to handle the form data if needed
    });

    dialogRef.afterClosed();
  }

  openDeleteCategoryDialog(row: any): void {
    const dialogRef = this.dialog.open(DeleteCategoryComponent, {
      width: '400px',
      data: row,
    });

    dialogRef.componentInstance.deleteCategories.subscribe((formData: any) => {
      // Add additional logic to handle the form data if needed
    });

    dialogRef.afterClosed();;
  }

  openAddProductDialog(): void {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '800px',
    });

    dialogRef.componentInstance.productSubmitted.subscribe((formData: any) => {
      // Add additional logic to handle the form data if needed
    });

    dialogRef.afterClosed();;
  }

  // openUpdateProductDialog(row: any): void {
  //   const dialogRef = this.dialog.open(UpdateProductComponent, {
  //     width: '300px',
  //     data: row,
  //   });

  //   dialogRef.componentInstance.productSubmitted.subscribe((formData: any) => {
  //     // Add additional logic to handle the form data if needed
  //   });

  //   dialogRef.afterClosed();
  // }

  openDeleteProductDialog(row: any): void {
    const dialogRef = this.dialog.open(DeleteProductComponent, {
      width: '400px',
      data: row,
    });

    dialogRef.componentInstance.deleteProducts.subscribe((formData: any) => {
      // Add additional logic to handle the form data if needed
    });

    dialogRef.afterClosed();;
  }
}


