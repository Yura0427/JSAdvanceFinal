import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Brend } from '../classes/brend.model';

@Injectable({
  providedIn: 'root'
})
export class BrendService {

  private dbPath = '/brend';
  usersRef: AngularFirestoreCollection<Brend> = null;

  constructor(private db: AngularFirestore) { 
    this.usersRef = db.collection(this.dbPath);
  }
  createBrend(bend: Brend): void {
    this.usersRef.add({...bend});
  }
  getBrendsList(): AngularFirestoreCollection<Brend> {
    return this.usersRef;
  }
}
