import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from 'src/app/shared/services/users.service';
import { map } from 'rxjs/operators';
import { User } from 'src/app/shared/classes/user.model';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

  @Input() user: User;

  users:any;

  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.getUsersList();
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
 
  deleteUsers() {
    this.userService.deleteAll();
  }
  // updateActive(isActive: boolean) {
  //   this.customerService
  //     .updateCustomer(this.customer.key, { active: isActive })
  //     .catch(err => console.log(err));
  // }
 
  deleteUser(user) {
    // console.log(user.key)
    this.userService
      .deleteUser(user.key)
      .catch(err => console.log(err));
  }

}
