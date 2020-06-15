import { Component, OnInit, Output } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';
import { BasketService } from 'src/app/shared/services/basket.service';
import { UsersService } from 'src/app/shared/services/users.service';


@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  public mask = ['+', '3', '8', '(', /[0-9]/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  items = []
  totalPrice: number = 0
  bascetEmpty: boolean

  data:any;
  name: string
  email: string
  address: string
  city: string
  state: string
  tel: string
  arrOrder: any[]

  constructor(private orderService: OrderService,
    private basketService: BasketService,
    private userService: UsersService, ) { }

  ngOnInit() {
    this.getItems();
    this.getUser();
  }

  getUser() {
    // console.log(localStorage.getItem('user'))
    if (localStorage.getItem('user')) {
      const key = JSON.parse(localStorage.getItem('user')).dbID;
      this.userService.usersRef.doc(key).valueChanges().subscribe(
        data => {
          this.data = data;
          this.name = this.data.fullName;
          this.email = this.data.userEmail;
          this.address = this.data.address;
          this.city = this.data.city;
          this.state = this.data.state;
          this.tel = this.data.tel;
        })
    }


  }

  getItems() {
    this.items = [];
    this.totalPrice = 0;
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i) != 'user') {
        this.bascetEmpty = true
        const item = JSON.parse(localStorage.getItem(localStorage.key(i)))
        this.items.push(item);
        this.totalPrice += (JSON.parse(localStorage.getItem(localStorage.key(i))).price * JSON.parse(localStorage.getItem(localStorage.key(i))).quantity)
      }
    }
  }

  minus(item) {
    const it = JSON.parse(localStorage.getItem(item.key))
    if (it.quantity > 1) {
      it.quantity = it.quantity - 1
    }
    localStorage.setItem(item.key, JSON.stringify(it))
    this.getItems()
  }
  plus(item) {
    const it = JSON.parse(localStorage.getItem(item.key))
    it.quantity = it.quantity + 1
    localStorage.setItem(item.key, JSON.stringify(it))
    this.getItems()
  }

  delProd(item) {
    localStorage.removeItem(item.key)
    this.getItems()
    this.basketService.getItemsLength()
  }

  order(items) {
    this.arrOrder = []
    items.forEach(element => {
      this.arrOrder.push(`Ключ замовленя: ${element.key} Кількість: ${element.quantity}`);
      localStorage.removeItem(element.key);
    });
    this.basketService.getItemsLength()
    this.orderService.createOrder({
      name: this.name,
      email: this.email,
      address: this.address,
      city: this.city,
      state: this.state,
      tel: this.tel,
      orders: this.arrOrder,
    });
    this.name = ''
    this.email = ''
    this.address = ''
    this.city = ''
    this.state = ''
    this.tel = ''
    this.getItems()
  }
}
