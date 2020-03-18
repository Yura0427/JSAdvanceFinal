import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private dbPath = '/blog';
 
  usersRef: AngularFirestoreCollection<any> = null;



  constructor(private db: AngularFirestore) {
    this.usersRef = db.collection(this.dbPath);
  }

  createBlog(blog: any): void {
    this.usersRef.add({...blog});
  }
 
  updateBlog(key: string, value: any): Promise<void> {
    return this.usersRef.doc(key).update(value);
  }
 
  deleteBlog(key: string): Promise<void> {
    return this.usersRef.doc(key).delete();
  }
 
  getBlogsList(): AngularFirestoreCollection<any> {
    return this.usersRef;
  }
 

}
