import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { User } from 'src/app/shared/classes/user.model';
import { UsersService } from 'src/app/shared/services/users.service';
import { map } from 'rxjs/operators';
import { Key } from 'protractor';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BasketService } from 'src/app/shared/services/basket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  modalRef: BsModalRef;
  isMenuCollapsed = true;
  active = 1;

  //SignUp form 
  userName: string;
  userEmail: string;
  userPass: string;
  userAdmin: boolean = true;
  loginStatus: boolean = false;

  users: User[]

  //SignIn form 
  SignInEmail: string;
  SignInPass: string;

  currentUser: User = new User();
  itsLogin: any;

  items: number;

  constructor(private modalService: BsModalService,
    private userService: UsersService,
    private firebaseService: AuthService,
    private basketService: BasketService) {
    this.basketService.items.subscribe(i => this.items = i)
    this.firebaseService.userStatusChanges.subscribe(i => this.itsLogin = i)
  }

  ngOnInit() {
    this.getUser();
    this.basketService.getItemsLength()
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  newUser() {
    this.firebaseService.signUp(this.userEmail, this.userPass, this.userName)
    this.modalRef.hide();
    this.userName = '';
    this.userEmail = '';
    this.userPass = '';
  }

  SignInUser() {
    this.firebaseService.login(this.SignInEmail, this.SignInPass)
    this.modalRef.hide();
    this.getUser();
    this.SignInEmail = ''
    this.SignInPass = ''
  }

  getUser() {
    const element = JSON.parse(localStorage.getItem('user'))
    if (element) {
      this.currentUser.userEmail = element.userEmail;
      this.currentUser.userName = element.userName;
      this.currentUser.userAdmin = element.userAdmin;
      this.currentUser.loginStatus = element.loginStatus;
      this.currentUser.dbID = element.dbID;
      console.log('true', this.currentUser)
      return this.itsLogin = true
    }
    else {
      console.log('false')
      return this.itsLogin = false
    }
  }

  logOut() {
    this.firebaseService.logOut()
    // this.userService.updateUser(this.currentUser.dbID, { loginStatus: false });
    this.modalRef.hide();
  }

}
