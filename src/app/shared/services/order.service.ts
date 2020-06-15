import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private dbPath = '/orders';
 
  usersRef: AngularFirestoreCollection<any> = null;

  constructor(private db: AngularFirestore) {
    this.usersRef = db.collection(this.dbPath);
  }

  createOrder(order: any): void {
    this.usersRef.add({...order});
  }
 
  getOrdersList(): AngularFirestoreCollection<any> {
    return this.usersRef;
  }

  deleteOrder(key: string): Promise<void> {
    return this.usersRef.doc(key).delete();
  }
 
}
