import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { AddOrderService } from '../../services/add-order.service';
import { SharedServices } from 'src/app/services/shared.service';

@Component({
  selector: 'app-pending-order',
  templateUrl: './pending-order.component.html',
  styleUrls: ['./pending-order.component.css']
})
export class PendingOrderComponent implements AfterViewInit, OnInit {

  constructor(
    private addOrderService: AddOrderService,
    private orderService: SharedServices,
    public dialog: MatDialog
  ) {}

  allOrdersData: orderData[] = [];
  displayedColumns: string[] = ['order_no', 'gstNoSupplier', 'quantity', 'order_date', 'duration', 'status'];
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

  fetchOrders() {
    this.orderService.getOrderByStatus('Pending').subscribe(
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


  ngAfterViewInit() {
    // Set paginator and sort after the view is initialized
    this.setPaginatorAndSort();
  }

  addOrder() {
    this.addOrderService.openAddOrderDialog();
  }

  updateOrder(row: any) {
    // Add your update logic here 
    this.addOrderService.openUpdateOrderDialog(row);
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'status-pending';
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
