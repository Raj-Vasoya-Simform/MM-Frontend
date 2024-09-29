import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegistrationComponent } from './components/authentication/registration/registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material/material.module';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidenavComponent } from './components/header/sidenav/sidenav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManageCategoriesComponent } from './components/manage-categories/manage-categories.component';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { ManageOrdersComponent } from './components/manage-orders/manage-orders.component';
import { MatSortModule } from '@angular/material/sort';
import { AddOrderComponent } from './components/add-order/add-order.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/header/navbar/navbar.component';
import { CustomeInterceptor } from './services/custome.interceptor';
import { DatePipe } from '@angular/common';
import { PendingOrderComponent } from './components/pending-order/pending-order.component';
import { ProgressOrderComponent } from './components/progress-order/progress-order.component';
import { DeliveredOrderComponent } from './components/delivered-order/delivered-order.component';
import { CancelledOrderComponent } from './components/cancelled-order/cancelled-order.component';
import { UpdateOrderComponent } from './components/update-order/update-order.component';
import { DeleteOrderComponent } from './components/delete-order/delete-order.component';
import { AddCategoryComponent } from './components/category/add-category/add-category.component';
import { UpdateCategoryComponent } from './components/category/update-category/update-category.component';
import { DeleteCategoryComponent } from './components/category/delete-category/delete-category.component';
import { HistoryComponent } from './components/history/history.component';
import { AddProductComponent } from './components/product/add-product/add-product.component';
import { UpdateProductComponent } from './components/product/update-product/update-product.component';
import { DeleteProductComponent } from './components/product/delete-product/delete-product.component';
import { ViewCategoryComponent } from './components/category/view-category/view-category.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    SidenavComponent,
    DashboardComponent,
    ManageCategoriesComponent,
    ManageProductsComponent,
    ManageOrdersComponent,
    AddOrderComponent,
    NavbarComponent,
    PendingOrderComponent,
    ProgressOrderComponent,
    DeliveredOrderComponent,
    CancelledOrderComponent,
    UpdateOrderComponent,
    DeleteOrderComponent,
    AddCategoryComponent,
    UpdateCategoryComponent,
    DeleteCategoryComponent,
    HistoryComponent,
    AddProductComponent,
    UpdateProductComponent,
    DeleteProductComponent,
    ViewCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatSortModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomeInterceptor,
      multi: true
    },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
