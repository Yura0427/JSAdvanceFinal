import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Brend } from 'src/app/shared/classes/brend.model';
import { map, finalize } from 'rxjs/operators';
import { BrendService } from 'src/app/shared/services/brend.service';
import { Product } from 'src/app/shared/classes/product.model';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})

export class AdminProductsComponent implements OnInit {

  modalRef: BsModalRef;

  brend: Brend = new Brend();
  newBrendVal: string;
  arrBrend: Array<Brend>;

  product: Product = new Product();

  brendVal: string;
  price: number;
  numbSpeeds: number;
  type: string;
  sizeFrame: string;
  sizeWheel: string
  productImage: string

  // Upload image variables
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;

  constructor(private productService: ProductsService,
    // private firestore: AngularFirestore,
    private modalService: BsModalService,
    private brendService: BrendService,
    private afStorage: AngularFireStorage) { }

  ngOnInit() {
    this.getBrendsList()
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  newBrend() {
    this.brend.brend = this.newBrendVal;
    this.brendService.createBrend(this.brend);
    this.brend = new Brend();
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

  newProduct() {
    this.product.brend = this.brendVal;
    this.product.price = this.price;
    this.product.speedsNumber = this.numbSpeeds
    this.product.type = this.type
    this.product.sizeFrame = this.sizeFrame
    this.product.sizeWheel = this.sizeWheel
    this.product.productImage = this.productImage
    console.log(this.product)
    this.productService.createProduct(this.product);
    this.product = new Product();
  }
  public upload(event: any): void {
    const file = event.target.files[0];
    const filePath = `products/${this.createUUID()}.${file.type.split('/')[1]}`;
    this.task = this.afStorage.upload(filePath, file);
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges()
      .pipe(finalize(() => this.downloadURL = this.afStorage.ref(filePath).getDownloadURL()))
      .subscribe();
    this.task.then((e) => {
      this.afStorage.ref(`products/${e.metadata.name}`).getDownloadURL().subscribe(data => {
        this.productImage = data;
      });
    });
    console.log(event)
  }
  private createUUID(): string {
    let dt = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      // tslint:disable-next-line:no-bitwise
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      // tslint:disable-next-line:no-bitwise
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }
}
