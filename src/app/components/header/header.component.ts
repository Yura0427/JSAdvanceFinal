import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { User } from 'src/app/shared/classes/user.model';
import { UsersService } from 'src/app/shared/services/users.service';
import { map } from 'rxjs/operators';
import { Key } from 'protractor';

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

  user: User = new User();

  constructor(private modalService: BsModalService,
    private userService: UsersService) { }

  ngOnInit() { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  newUser() {
    this.user.userName = this.userName;
    this.user.userEmail = this.userEmail;
    this.user.userPass = this.userPass;
    this.user.userAdmin = this.userAdmin;
    this.user.loginStatus = this.loginStatus;
    this.userService.createUser(this.user);
    this.user = new User();
    this.resetFormReg();
    this.modalRef.hide()
  }
  resetFormReg() {
    this.userName = '';
    this.userEmail = '';
    this.userPass = '';
  }


  SignInUser() {
    this.userService.getUsersList().snapshotChanges().pipe(
      map(changes => changes.map(
        c => ({ key: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe(users => {
      users.forEach(element => {
        // debugger
        console.log(element.userEmail, element.userPass);
        console.log(this.SignInEmail, this.SignInPass);
        if (element.userEmail == this.SignInEmail) {
          if (element.userPass == this.SignInPass) {
            this.userService.updateUser(element.key, { loginStatus: true })
            this.currentUser.userEmail = element.userEmail;
            this.currentUser.userName = element.userName;
            this.currentUser.userAdmin = element.userAdmin;
            this.currentUser.loginStatus = element.loginStatus;
            this.modalRef.hide()
            console.log('log true');   
            // return true;    
          }
        }
      })

    });

    // this.userService.getUsersList().valueChanges().subscribe(users => {
    //   users.forEach(element => {
    //     console.log(element.userEmail, element.userPass);
    //     console.log(this.SignInEmail, this.SignInPass);
    //     if (element.userEmail == this.SignInEmail) {
    //       if (element.userPass == this.SignInPass) {
    //         this.userService.updateUser(element.key, { loginStatus: true })
    //         this.currentUser.userEmail=element.userEmail;
    //         this.currentUser.userName=element.userName;
    //         this.currentUser.userAdmin=element.userAdmin;
    //         this.currentUser.loginStatus=element.loginStatus;
    //         console.log('log true')
    //       }
    //     }
    //   })
    // });
  }



}
