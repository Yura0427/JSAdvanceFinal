import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/shared/classes/product.model';
import { ProductsService } from 'src/app/shared/services/products.service';
import { map } from 'rxjs/operators';
import { Brend } from 'src/app/shared/classes/brend.model';
import { BrendService } from 'src/app/shared/services/brend.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  arrBrend: Array<Brend>;
  products: Array<Product>

  dropBrend: boolean = true
  dropPrice: boolean = true
  dropType: boolean = true
  dropFrame: boolean = true
  dropWheel: boolean = true
  dropSpeeds: boolean = true

  //filter
  filterBrend = []

  constructor(private productService: ProductsService,
    private brendService: BrendService) { }

  ngOnInit() {
    this.getProductsList()
    this.getBrendsList()
  }
  getProductsList() {
    this.productService.getProductsList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(products => {
      this.products = products;
    });
  }

  getBrendsList() {
    this.brendService.getBrendsList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(arrBrend => {
      this.arrBrend = arrBrend;
    });
  }

  getSelected(event) {
    if (event.target.checked) { this.filterBrend.push(event.target.value) }
    if (!event.target.checked) {
      this.filterBrend.splice(this.filterBrend.findIndex(arr =>
        arr === `${event.target.value}`), 1)
    }
  }

}
