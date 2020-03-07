import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Product } from 'src/app/shared/classes/product.model';
import { ProductsService } from 'src/app/shared/services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})
export class ProductsDetailsComponent implements OnInit {
  data: any;

  constructor(private prService: ProductsService,
    private route: ActivatedRoute,
    private location: Location, ) { }

  ngOnInit() {
    this.getData();
  }

  getData(): void {
    const key = this.route.snapshot.paramMap.get('key');
    this.prService.usersRef.doc(key).valueChanges().subscribe(
      data => {
        this.data = data
        console.log(data)
      })
        console.log(key)

  }

  back(): void {
    this.location.back();
  }

}
