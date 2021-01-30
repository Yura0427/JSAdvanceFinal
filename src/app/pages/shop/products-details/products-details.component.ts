import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Product } from 'src/app/shared/classes/product.model';
import { ProductsService } from 'src/app/shared/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/shared/services/basket.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})
export class ProductsDetailsComponent implements OnInit {
  data: any;

  constructor(private prService: ProductsService,
    private route: ActivatedRoute,
    private location: Location,
    private basketService: BasketService) { }

  ngOnInit() {
    this.getData();
  }

  getData(): void {
    const key = this.route.snapshot.paramMap.get('key');
    this.prService.usersRef.doc(key).valueChanges().subscribe(
      data => {
        this.data = data
      })
  }

  buy() {
    const key = this.route.snapshot.paramMap.get('key');
    this.data.key = key;
    if (localStorage.length > 0) {
      for (let j = 0; j < localStorage.length; j++) {
        if (this.data.key === localStorage.key(j)) {
          return console.log('tovar vge v korzuni');
        }
      }
    }
    this.data.quantity = 1
    localStorage.setItem(`${key}`, JSON.stringify(this.data))
    this.basketService.getItemsLength();
  }

  back(): void {
    this.location.back();
  }
}
