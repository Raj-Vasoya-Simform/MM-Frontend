import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AddOrderService } from 'src/app/services/add-order.service';
import { SharedServices } from 'src/app/services/shared.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements AfterViewInit {

  constructor(
    private addProductService: AddOrderService,
    private productService: SharedServices,
    private router: Router
    ){}

  // Dummy data
  allProductsData: productData[] = [];
  dataSource = new MatTableDataSource<productData>(this.allProductsData);

  displayedColumns: string[] = ['unique_id', 'name', 'qty', 'price', 'categoryName', 'description', 'actions'];

  // Reference to MatPaginator and MatSort
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  // Apply filter function
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Lifecycle hook to initialize the paginator and sort after the view is initialized
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
    this.dataSource.sort = this.sort!;
  }

  ngOnInit(): void {
    this.fetchProducts();
  }

addProduct() {
  // Add logic to handle adding categories
  this.router.navigate(['/add-product'])
  this.addProductService.openAddProductDialog();
  // You can open a dialog or perform any other necessary actions here
}

updateProduct(row: any) {
  console.log("Update Product!!")
  // this.router.navigate(['/update-category'])
  // this.addCategoryService.openUpdateCategoryDialog(row);
}

deleteProduct(row: any) {
  // Add your delete logic here
  this.router.navigate(['/delete-product'])
  this.addProductService.openDeleteProductDialog(row);
}

fetchProducts() {
  this.productService.getAllProducts().subscribe(
    (res: any) => {
      this.allProductsData = res.data;
      this.dataSource.data = this.allProductsData;
      this.setPaginatorAndSort();
    },
    (error: any) => {
      console.error('Error fetching orders:', error);
      // Handle error gracefully, e.g., show a user-friendly message
    }
  );
}

setPaginatorAndSort() {
  if (this.paginator && this.sort) {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}

}

export interface productData {
  name: string;
  qty: number;
  price: number;
  description: string;
  categoryName: string;

}
