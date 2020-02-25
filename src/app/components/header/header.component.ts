import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { User } from 'src/app/shared/classes/user.model';
import { UsersService } from 'src/app/shared/services/users.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  modalRef: BsModalRef;
  public isMenuCollapsed = true;
  active = 1;

  userName: string;
  userEmail: string;
  userPass: string;
  userAdmin: boolean = true;
  users:any

  user: User = new User();

  constructor(private modalService: BsModalService,
    private userService: UsersService) { }

  ngOnInit() {
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  newUser() {
    this.user.userName= this.userName;
    this.user.userEmail= this.userEmail;
    this.user.userPass= this.userPass;
    this.user.userAdmin= this.userAdmin;
    this.userService.createUser(this.user);
    this.user = new User();
  }

  getUsersList() {
    this.userService.getUsersList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(users => {
      this.users = users;
    });
  }

  SignInUser() {
    this.userService.usersRef.get().subscribe(
      data => {
        console.log(data.docs);
      });
  }
}
