import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SharedServices } from 'src/app/services/shared.service';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';

export interface Order {
  address: string;
  calCgst: number;
  calIgst: number;
  calSgst: number;
  cgstAmount: number;
  createdOn: string;
  description: string;
  status: string;
  duration: number;
  gstNoSupplier: string;
  idMarks: string;
  igstAmount: number;
  is_deleted: boolean;
  natureOfProcessing: string;
  order_date: string;
  quantity: number;
  rofCgst: number;
  rofIgst: number;
  rofSgst: number;
  sgstAmount: number;
  trafficClassification: string;
  updatedOn: string;
  _id: string;
  [key: string]: string | number | boolean;
}

const ELEMENT_DATA: Order[] = [];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DashboardComponent implements OnInit {
  constructor(private recentOrder: SharedServices, private datePipe: DatePipe) {}

  dataSource = new MatTableDataSource<Order>(ELEMENT_DATA);
  orderCounts = 0;
  pendingOrderCount = 0;
  inProgressOrderCount = 0;
  deliveredOrderCount = 0;
  cancelledOrderCount = 0;
  loading: boolean = false;

  columnsToDisplay = ["order_no", "customer", "quantity", "order_date", "status"];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement?: Order | null;

  orders = [
    { title: 'Total Orders', subtitle: this.orderCounts, imageUrl: '../../../assets/total_orders.jfif' },
    { title: 'Pending Orders', subtitle: this.pendingOrderCount, imageUrl: '../../../assets/pending_orders.jfif' },
    { title: 'In Progress Orders', subtitle: this.inProgressOrderCount, imageUrl: '../../../assets/in_progress_orders.jfif' },
    { title: 'Delivered Orders', subtitle: this.deliveredOrderCount, imageUrl: '../../../assets/delivered_orders.jfif' },
    { title: 'Cancelled Orders', subtitle: this.cancelledOrderCount, imageUrl: '../../../assets/cancelled_orders.jfif' }
  ];

  ngOnInit(): void {
    this.recentOrder.orderUpdated$().subscribe(() => {
      this.fetchRecentOrders();
      this.fetchAllOrdersCount();
      this.fetchPendingOrdersCount();
      this.fetchInProgressOrdersCount();
      this.fetchDeliveredOrdersCount();
      this.fetchCancelledOrdersCount();
    });
  }

  fetchRecentOrders() {
    this.loading = true;  // Start loading bar
    this.recentOrder.getRecentOrders().subscribe(
      (res: any) => {
        this.loading = false;  // Stop loading bar
        this.dataSource.data = res.data;
      },
      (error) => {
        console.error('Error fetching recent orders:', error);
      }
    );
  }

  fetchAllOrdersCount() {
    this.recentOrder.getAllOrdersCount().subscribe(
      (res: any) => {
        this.orderCounts = res.data;

        // Update the orders array after fetching the count
        this.updateOrdersArray();
      },
      (error) => {
        console.error('Error fetching total orders count:', error);
      }
    );
  }

  fetchPendingOrdersCount() {
    this.recentOrder.getPendingOrdersCount().subscribe(
      (res: any) => {
        this.pendingOrderCount = res.data;

        // Update the orders array after fetching the count
        this.updateOrdersArray();
      },
      (error) => {
        console.error('Error fetching pending orders count:', error);
      }
    );
  }

  fetchInProgressOrdersCount() {
    this.recentOrder.getInProgressOrderCount().subscribe(
      (res: any) => {
        this.inProgressOrderCount = res.data;

        // Update the orders array after fetching the count
        this.updateOrdersArray();
      },
      (error) => {
        console.error('Error fetching pending orders count:', error);
      }
    );
  }

  fetchDeliveredOrdersCount() {
    this.recentOrder.getDeliveredOrderCount().subscribe(
      (res: any) => {
        this.deliveredOrderCount = res.data;

        // Update the orders array after fetching the count
        this.updateOrdersArray();
      },
      (error) => {
        console.error('Error fetching pending orders count:', error);
      }
    );
  }

  fetchCancelledOrdersCount() {
    this.recentOrder.getCancelledOrderCount().subscribe(
      (res: any) => {
        this.cancelledOrderCount = res.data;

        // Update the orders array after fetching the count
        this.updateOrdersArray();
      },
      (error) => {
        console.error('Error fetching pending orders count:', error);
      }
    );
  }

  updateOrdersArray() {
    this.orders = [
      { title: 'Total Orders', subtitle: this.orderCounts, imageUrl: '../../../assets/total_orders.jfif' },
      { title: 'Pending Orders', subtitle: this.pendingOrderCount, imageUrl: '../../../assets/pending_orders.jfif' },
      { title: 'In Progress Orders', subtitle: this.inProgressOrderCount, imageUrl: '../../../assets/in_progress_orders.jfif' },
      { title: 'Delivered Orders', subtitle: this.deliveredOrderCount, imageUrl: '../../../assets/delivered_orders.jfif' },
      { title: 'Cancelled Orders', subtitle: this.cancelledOrderCount, imageUrl: '../../../assets/cancelled_orders.jfif' }
    ];
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
