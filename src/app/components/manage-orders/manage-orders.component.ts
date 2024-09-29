import { Component, AfterViewInit, ViewChild, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { AddOrderService } from '../../services/add-order.service';
import { Order } from '../dashboard/dashboard.component';
import { SharedServices } from 'src/app/services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements AfterViewInit, OnInit, OnChanges {
  displayedOrder: any;

  constructor(
    private addOrderService: AddOrderService,
    private orderService: SharedServices,
    public dialog: MatDialog,
    private router: Router
  ) {}

  allOrdersData: orderData[] = [];
  displayedColumns: string[] = ['select', 'order_no', 'gstNoSupplier', 'quantity', 'order_date', 'duration', 'status', 'actions'];
  dataSource = new MatTableDataSource<orderData>(this.allOrdersData);
  selection = new SelectionModel<orderData>(true, []);

  // Using a single set of MatPaginator and MatSort for all data sources
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  ngOnInit(): void {

    this.orderService.orderUpdated$().subscribe((updatedOrder) => {
      this.fetchOrders();
    });
  }

ngOnChanges(changes: SimpleChanges): void {
  this.fetchOrders();
}

  fetchOrders() {
    this.orderService.getAllOrders().subscribe(
      (res: any) => {
        this.allOrdersData = res.data;
        this.dataSource.data = this.allOrdersData;
        this.setPaginatorAndSort();
      },
      (error: any) => {
        console.error('Error fetching orders:', error);
        // Handle error gracefully, e.g., show a user-friendly message
      }
    );
  }

  // Method to set paginator and sort for the data source
  setPaginatorAndSort() {
    if (this.paginator && this.sort) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: orderData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row._id}`;
  }

  ngAfterViewInit() {
    // Set paginator and sort after the view is initialized
    this.setPaginatorAndSort();
  }
  selectedTabIndex: number = 0;

  onTabChanged(event: any) {
    const tabLabel = event.tab.textLabel;
    // this.setDisplayedColumns(tabLabel);
    this.selectedTabIndex = event.index;

    // Change the dataSource based on the selected tab
    if (tabLabel === 'All Orders') {
      this.dataSource = new MatTableDataSource<orderData>(this.allOrdersData);
      this.setPaginatorAndSort(); // Reset paginator and sort for the new data source
    }
  }

  // setDisplayedColumns(tabLabel: string) {
  //   // Define columns based on the selected tab
  //   if (tabLabel === 'All Orders') {
  //     this.displayedColumns = ['select', '_id', 'customer', 'quantity', 'order_date', 'duration', 'status', 'actions'];
  //   } else {
  //     this.displayedColumns = ['idMarks', 'gstNo', 'descriptionOfGoods', 'quantity', 'dateTimeOfIssue', 'duration'];
  //   }
  // }

  addOrder() {
    this.addOrderService.openAddOrderDialog();
  }

  updateOrder(row: any) {
    // Add your update logic here 
    this.addOrderService.openUpdateOrderDialog(row);
  }

  deleteOrder(row: any) {
    // Add your delete logic here
    this.router.navigate(['/delete-order'])
    this.addOrderService.openDeleteOrderDialog(row);
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'status-pending';
      case 'delivered':
        return 'status-delivered';
      case 'in progress':
        return 'status-in-progress';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return 'status-default';
    }
  }
  
  
}

export interface orderData {
  _id: string;
  gstNoSupplier: string;
  quantity: number;
  order_date: Date;
  duration: number;
}
