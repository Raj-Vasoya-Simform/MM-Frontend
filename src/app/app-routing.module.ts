import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegistrationComponent } from './components/authentication/registration/registration.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManageCategoriesComponent } from './components/manage-categories/manage-categories.component';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { ManageOrdersComponent } from './components/manage-orders/manage-orders.component';
import { AddCategoryComponent } from './components/category/add-category/add-category.component';
import { HistoryComponent } from './components/history/history.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'manage-categories',
    component: ManageCategoriesComponent,
  },
  {
    path: 'manage-products',
    component: ManageProductsComponent,
  },
  {
    path: 'manage-orders',
    component: ManageOrdersComponent,
  },
  {
    path: 'delete-order',
    component: ManageOrdersComponent,
  },
  {
    path: 'add-category',
    component: ManageCategoriesComponent,
  },
  {
    path: 'update-category',
    component: ManageCategoriesComponent,
  },
  {
    path: 'delete-category',
    component: ManageCategoriesComponent,
  },
  {
    path: 'history',
    component: HistoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
