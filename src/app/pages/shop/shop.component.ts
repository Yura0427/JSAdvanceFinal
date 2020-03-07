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

  // dropBrend:boolean
  // dropPrice:boolean
  // dropType:boolean
  // dropFrame:boolean
  // dropWheel:boolean
  // dropSpeeds:boolean
  arrBrend: Array<Brend>;
  
  products: Array<Product>

  //filter
  filBrend :string
  filterItem
  
  constructor(private productService: ProductsService,
              private brendService: BrendService) { }

  ngOnInit() {
    this.getProductsList()
    this.getBrendsList()
  }
  getProductsList() {
    console.log(this.productService.getProductsList().snapshotChanges())

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
  getSelected(event){
    // this.arrBrend.filter(arr => arr.brend==event.target.value)
    // this.filBrend.push(event.target.value)
    this.products = this.products.filter(arr=>{return arr.brend == event.target.value})
    console.log(this.filBrend)
    console.log(event.target)
  }
  
}
