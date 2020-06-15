import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/services/users.service';
import { User } from 'src/app/shared/classes/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public mask = ['+', '3', '8', '(', /[0-9]/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  user: any
  name: string
  address: string
  city: string
  state: string
  tel: string

  constructor(
    private userService: UsersService
  ) { }

  ngOnInit() {
    this.getData()
  }

  getData(): void {
    console.log(JSON.parse(localStorage.getItem('user')).dbID)
    const key = JSON.parse(localStorage.getItem('user')).dbID;
    this.userService.usersRef.doc(key).valueChanges().subscribe(
      data => {
        this.user = data
      })
    
  }

  save() {
    this.userService
      .updateUser(JSON.parse(localStorage.getItem('user')).dbID, {
        fullName: this.name,
        address: this.address,
        city: this.city,
        state: this.state,
        tel: this.tel,

      })
      .catch(err => console.log(err));
  }

}
