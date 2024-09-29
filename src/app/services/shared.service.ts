import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { RegisterFormData } from '../components/authentication/registration/registration.component';
import { LoginFormData } from '../components/authentication/login/login.component';

@Injectable({
  providedIn: 'root',
})
export class SharedServices {
  // Notice API URL
  apiUrl = 'http://localhost:4000';
  // apiUrl = 'https://modern-manager.onrender.com';

    // Create a subject to notify components about updated orders
    private orderUpdatedSubject = new BehaviorSubject<any>(null);
    private categoryUpdatedSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  // Add Notice
  registration(RegisterFormData: RegisterFormData) {
    return this.http.post(`${this.apiUrl}/register`, RegisterFormData);
  }

  login(LoginFormData: LoginFormData) {
    return this.http.post(`${this.apiUrl}/login`, LoginFormData);
  }

  storeProfile(profilePicture: File) {
     // Send a POST request to the server to store the profile picture
     return this.http.post(`${this.apiUrl}/profile/store`, profilePicture);
  }

  storeOrder(orderData: any) {
     // Send a POST request to the server to store the profile picture
     return this.http.post(`${this.apiUrl}/order/store`, orderData);
  }

  updateOrder(order_id: string, orderData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/order/update/${order_id}`, orderData)
      .pipe(
        // Notify components about the updated order
        tap(() => this.orderUpdatedSubject.next(orderData))
      );
  }

  deleteOrder(order_id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/order/remove/${order_id}`);
  }

  // Observable for components to subscribe to for order updates
  orderUpdated$(): Observable<any> {
    return this.orderUpdatedSubject.asObservable();
  }

  getRecentOrders() {
    return this.http.get(`${this.apiUrl}/order/get_recent_order`);
  }

  getAllOrders() {
    return this.http.get(`${this.apiUrl}/order/list`);
  }

  getAllOrdersCount() {
    return this.http.get(`${this.apiUrl}/order/get_all_order_count`);
  }

  getPendingOrdersCount() {
    return this.http.get(`${this.apiUrl}/order/get_pending_order_count`);
  }

  getInProgressOrderCount() {
    return this.http.get(`${this.apiUrl}/order/get_in_progress_order_count`);
  }

  getDeliveredOrderCount() {
    return this.http.get(`${this.apiUrl}/order/get_delivered_order_count`);
  }

  getCancelledOrderCount() {
    return this.http.get(`${this.apiUrl}/order/get_cancelled_order_count`);
  }

  getOrderByStatus(status: string) {
    return this.http.get(`${this.apiUrl}/order/order_by/${status}`);
  }

  storeCategory(categoryData: any) {
    // Send a POST request to the server to store the profile picture
    return this.http.post(`${this.apiUrl}/category/store`, categoryData);
 }

 getCategory(category_id: string): Observable<any> {
  return this.http.get(`${this.apiUrl}/category/${category_id}`);
}

updateCategory(category_id: string, categoryData: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/category/update/${category_id}`, categoryData);
}

 getAllCategories() {
  return this.http.get(`${this.apiUrl}/category/list`);
}

getEnabledCategories() {
  return this.http.get(`${this.apiUrl}/category/enabled_categories`);
}

deleteCategory(category_id: string) {
  return this.http.delete(`${this.apiUrl}/category/remove/${category_id}`);
}

getAllHistory() {
  return this.http.get(`${this.apiUrl}/history/get_history`);
}

storeProduct(productData: any) {
  // Send a POST request to the server to store the profile picture
  return this.http.post(`${this.apiUrl}/product/store`, productData);
}

updateProduct(product_id: string, productData: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/product/update/${product_id}`, productData);
}

getAllProducts() {
  return this.http.get(`${this.apiUrl}/product/list`);
}

deleteProduct(product_id: string) {
  return this.http.delete(`${this.apiUrl}/product/remove/${product_id}`);
}

}