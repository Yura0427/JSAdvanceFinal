import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../classes/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private dbPath = '/products';
 
  usersRef: AngularFirestoreCollection<Product> = null;



  constructor(private db: AngularFirestore) {
    this.usersRef = db.collection(this.dbPath);
  }

  createProduct(product: Product): void {
    this.usersRef.add({...product});
  }
 
  updateProduct(key: string, value: any): Promise<void> {
    return this.usersRef.doc(key).update(value);
  }
 
  deleteProduct(key: string): Promise<void> {
    return this.usersRef.doc(key).delete();
  }
 
  getProductsList(): AngularFirestoreCollection<Product> {
    return this.usersRef;
  }
 
  deleteAll() {
    this.usersRef.get().subscribe(
      querySnapshot => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
        });
      },
      error => {
        console.log('Error: ', error);
      });
  }
}
