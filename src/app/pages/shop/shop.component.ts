import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  products: Array<any> = [
    {
      categoryID: 1,
      brend: 'Ardis',
      price: 1000,
      type: 'Двопідвіс',
      sizeFrame: 'XS',
      sizeWheel: '26',
      speedsNumber: '1'
    },
    {
      categoryID: 1,
      brend: 'Cannondale',
      price: 5000,
      type: 'Двопідвіс',
      sizeFrame: 'XL',
      sizeWheel: '27"5',
      speedsNumber: '24'
    },
    {
      categoryID: 1,
      brend: 'Cube',
      price: 10000,
      type: 'Двопідвіс',
      sizeFrame: 'M',
      sizeWheel: '29',
      speedsNumber: '27'
    },
    {
      categoryID: 1,
      brend: 'Ardis',
      price: 1000,
      type: 'Двопідвіс',
      sizeFrame: 'XS',
      sizeWheel: '26',
      speedsNumber: '1'
    },
    {
      categoryID: 1,
      brend: 'Cannondale',
      price: 5000,
      type: 'Двопідвіс',
      sizeFrame: 'XL',
      sizeWheel: '27"5',
      speedsNumber: '24'
    },
    {
      categoryID: 1,
      brend: 'Cube',
      price: 10000,
      type: 'Двопідвіс',
      sizeFrame: 'M',
      sizeWheel: '29',
      speedsNumber: '27'
    },
  ]
  constructor() { }

  ngOnInit() {
  }

}
