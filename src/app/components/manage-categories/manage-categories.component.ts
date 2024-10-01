import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AddOrderService } from 'src/app/services/add-order.service';
import { SharedServices } from 'src/app/services/shared.service';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css']
})
export class ManageCategoriesComponent implements OnInit, AfterViewInit {

constructor(
  private addCategoryService: AddOrderService,
  private categoryService: SharedServices,
  private router: Router
  ){}

  // Dummy data
  allCategoriesData: CategoryData[] = [];
  dataSource = new MatTableDataSource<CategoryData>(this.allCategoriesData);

  displayedColumns: string[] = ['name', 'status', 'actions'];
  loading: boolean = false;

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
    this.fetchCategories();
  }

addCategory() {
  // Add logic to handle adding categories
  this.router.navigate(['/add-category'])
  this.addCategoryService.openAddCategoryDialog();
  // You can open a dialog or perform any other necessary actions here
}

updateCategory(row: any) {
  this.router.navigate(['/update-category'])
  this.addCategoryService.openUpdateCategoryDialog(row);
}

deleteCategory(row: any) {
  // Add your delete logic here
  this.router.navigate(['/delete-category'])
  this.addCategoryService.openDeleteCategoryDialog(row);
}

viewCategory(row: any) {
  // Add your view logic here
  this.router.navigate(['/view-category'])
  this.addCategoryService.openViewCategoryDialog(row);
}


fetchCategories() {
  this.loading = true;  // Start loading bar
  this.categoryService.getAllCategories().subscribe(
    (res: any) => {
      this.loading = false;  // stop loading bar
      this.allCategoriesData = res.data;
      this.dataSource.data = this.allCategoriesData;
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

getStatusClass(status: string): string {
  switch (status.toLowerCase()) {
    case 'enable':
      return 'status-enable';
    case 'disable':
      return 'status-disable';
    default:
      return '';
  }
}

}

export interface CategoryData {
  name: string;
  status: string;
}
