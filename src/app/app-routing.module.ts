import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ProductsDetailsComponent } from './pages/shop/products-details/products-details.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { BlogComponent } from './pages/blog/blog.component';
import { BasketComponent } from './pages/basket/basket.component';

import { AuthGuard } from "./shared/guards/auth.guard";
import { AdminComponent } from './admin/admin.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';
import { AdminBlogComponent } from './admin/admin-blog/admin-blog.component';
import { BlogDetalsComponent } from './pages/blog/blog-detals/blog-detals.component';
import { UserComponent } from './pages/user/user.component';
import { BlogEditComponent } from './admin/admin-blog/blog-edit/blog-edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'shop/:key', component: ProductsDetailsComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blog/:key', component: BlogDetalsComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'user', component: UserComponent },
  { path: 'blog-edit/:key', component: BlogEditComponent },
  {
    path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: 'users', component: AdminUsersComponent },
      { path: 'products', component: AdminProductsComponent },
      { path: 'order', component: AdminOrderComponent },
      { path: 'blog', component: AdminBlogComponent },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
