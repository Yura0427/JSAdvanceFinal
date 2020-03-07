import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from '../classes/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private dbPath = '/users';

  usersRef: AngularFirestoreCollection<User> = null;

  constructor(private db: AngularFirestore) {
    this.usersRef = db.collection(this.dbPath);
  }

  createUser(user: User): void {
    this.usersRef.add({ ...user });
  }

  updateUser(key: string, value: any): Promise<void> {
    return this.usersRef.doc(key).update(value);
  }

  deleteUser(key: string): Promise<void> {
    return this.usersRef.doc(key).delete();
  }

  getUsersList(): AngularFirestoreCollection<User> {
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

  getUsers() {
    return this.usersRef
  }

}
