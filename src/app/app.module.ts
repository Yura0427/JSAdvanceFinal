import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { BlogComponent } from './pages/blog/blog.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ProductsDetailsComponent } from './pages/shop/products-details/products-details.component';
import { AdminComponent } from './admin/admin.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { BasketComponent } from './pages/basket/basket.component';
import { FilTypePipe } from './shared/pipes/fil-type.pipe';
import { FilPricePipe } from './shared/pipes/fil-price.pipe';
import { Ng5SliderModule } from 'ng5-slider';
import { AdminOrderComponent } from './admin/admin-order/admin-order/admin-order.component';
import { FilFramePipe } from './shared/pipes/fil-frame.pipe';
import { FilWheelPipe } from './shared/pipes/fil-wheel.pipe';
import { FilSpeedsPipe } from './shared/pipes/fil-speeds.pipe';
import { OrderModule } from 'ngx-order-pipe';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    ShopComponent,
    ContactsComponent,
    BlogComponent,
    ProductsDetailsComponent,
    AdminComponent,
    AdminUsersComponent,
    AdminProductsComponent,
    FilterPipe,
    BasketComponent,
    FilTypePipe,
    FilPricePipe,
    AdminOrderComponent,
    FilFramePipe,
    FilWheelPipe,
    FilSpeedsPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    AngularFontAwesomeModule,
    Angular2FontawesomeModule,
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AccordionModule.forRoot(),
    BrowserAnimationsModule,
    Ng5SliderModule,
    OrderModule,
  ],
  providers: [{ provide: FirestoreSettingsToken, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule { }
