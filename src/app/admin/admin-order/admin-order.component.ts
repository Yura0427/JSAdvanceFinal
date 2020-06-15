import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.scss']
})
export class AdminOrderComponent implements OnInit {

  orders:Array<any>;

  constructor(private orderService: OrderService,) { }

  ngOnInit() {
    this.getOrdersList()
  }

  getOrdersList() {
    this.orderService.getOrdersList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(orders => {
      this.orders = orders;
    });
  }

  doneOrder(order){
    console.log(order.key)
    this.orderService.deleteOrder(order.key)
  }
}
