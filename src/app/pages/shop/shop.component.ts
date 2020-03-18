import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/shared/classes/product.model';
import { ProductsService } from 'src/app/shared/services/products.service';
import { map } from 'rxjs/operators';
import { Brend } from 'src/app/shared/classes/brend.model';
import { BrendService } from 'src/app/shared/services/brend.service';
import { Options, LabelType } from 'ng5-slider';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  arrBrend: Array<Brend>;
  products: Array<Product>

  // dropmenu
  dropBrend: boolean = true
  dropPrice: boolean = true
  dropType: boolean = true
  dropFrame: boolean = true
  dropWheel: boolean = true
  dropSpeeds: boolean = true
  //filter
  selectedBrend = []
  minPrise: number
  maxPrise: number
  selectedType = []
  selectedFrame = []
  selectedWheel = []
  selectedSpeeds = []
  // sort
  order: string = '';
  reverse: boolean = false;

  constructor(private productService: ProductsService,
    private brendService: BrendService,
    private route: ActivatedRoute, ) { }

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
    if (event.target.checked) { this.selectedBrend.push(event.target.value) }
    if (!event.target.checked) {
      this.selectedBrend.splice(this.selectedBrend.findIndex(arr =>
        arr === `${event.target.value}`), 1)
    }
    console.log(this.selectedBrend)
  }

  getSelectedType(event) {
    if (event.target.checked) { this.selectedType.push(event.target.value) }
    if (!event.target.checked) {
      this.selectedType.splice(this.selectedType.findIndex(arr =>
        arr === `${event.target.value}`), 1)
    }
  }

  getSelectedFrame(event) {
    if (event.target.checked) { this.selectedFrame.push(event.target.value) }
    if (!event.target.checked) {
      this.selectedFrame.splice(this.selectedFrame.findIndex(arr =>
        arr === `${event.target.value}`), 1)
    }
  }

  getSelectedWheel(event) {
    if (event.target.checked) { this.selectedWheel.push(event.target.value) }
    if (!event.target.checked) {
      this.selectedWheel.splice(this.selectedWheel.findIndex(arr =>
        arr === `${event.target.value}`), 1)
    }
  }

  getSelectedSpeeds(event) {
    if (event.target.checked) { this.selectedSpeeds.push(event.target.value) }
    if (!event.target.checked) {
      this.selectedSpeeds.splice(this.selectedSpeeds.findIndex(arr =>
        arr === `${event.target.value}`), 1)
    }
  }

  buy(i) {
    localStorage.setItem(`${i.key}`, JSON.stringify(i))
    // console.log(JSON.stringify(this.data), key)  
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
    console.log(this.order)
  }
}
