import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: any;
  public userStatus: any;
  public userStatusChanges: BehaviorSubject<any> = new BehaviorSubject<any>(this.userStatus);
  public checkAdmin: boolean;

  constructor(private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private ngZone: NgZone,
    private userService: UsersService) { }

  setUserStatus(userStatus: any): void {
    this.userStatus = userStatus;
    this.userStatusChanges.next(userStatus);
  }

  signUp(email: string, password: string, name: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((userResponse) => {
        // add the user to the "users" database
        const user = {
          id: userResponse.user.uid,
          userEmail: userResponse.user.email,
          userAdmin: false,
          loginStatus: false,
          userName: name,
        };
        //add the user to the database
        this.firestore.collection('users').add(user)
          .then(user => {
            user.get().then(x => {
              //return the user data
              console.log(x.data());
              this.currentUser = x.data();
              this.setUserStatus(this.currentUser);
              // this.router.navigate(['/']);
            });
          }).catch(err => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log('An error ocurred: ', err);
      });
  }

  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.firestore.collection('users').ref.where('userEmail', '==', user.user.email).onSnapshot(snap => {
          snap.forEach(userRef => {
            console.log('userRef', userRef.data());
            this.userService.updateUser(userRef.id, { loginStatus: true })
            this.currentUser = userRef.data();
            this.currentUser.dbID = userRef.id;
            this.setUserStatus(this.currentUser);
            localStorage.setItem('user', JSON.stringify(this.currentUser));
            if (userRef.data().userAdmin === true) {
              this.checkAdmin = true;
              this.router.navigate(['/admin']);
            }
          });
        });
      }).catch(err => err)
  }

  logOut() {
    this.afAuth.auth.signOut()
      .then(() => {
        localStorage.removeItem('user');
        console.log('user signed Out successfully');
        // this.userService.updateUser(this.currentUser.dbID, { loginStatus: false });
        //set current user to null to be logged out
        this.currentUser = null;
        //set the listenener to be null, for the UI to react
        this.setUserStatus(null);
        this.ngZone.run(() => this.router.navigate(['/home']));
        this.checkAdmin = false;
        // this.checkUserLogin = false;
      }).catch((err) => {
        console.log(err);
      })
  }

  isAdminLogin(): boolean {
    if (localStorage.getItem('user')) { return JSON.parse(localStorage.getItem('user')).userAdmin }
    return this.checkAdmin;
  }

}
