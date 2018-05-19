import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/core/services';
import { Router } from '@angular/router';
import { User } from 'app/user/user';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

    // TODO: LEARN TO DO PARTIAL ....USE SAME FOR PRODUCT CARD
    private _peopleList: Observable<User[]>;

    constructor(private _userService: UserService,
                public router: Router) {}

    ngOnInit() {
        const myUserID = sessionStorage.getItem('user_doc_id') || localStorage.getItem('user_doc_id');
        this._peopleList = Observable.fromPromise(this._userService.getAllUsers2()
          .then(users => JSON.parse(users))
          .then(users => {
            const _users = new Array(users);
            return _users['0'].filter((user: User) => user.id !== myUserID);
          }));
    }

    onSelectPerson = (personID: string) => {
      console.log(personID);
      this.router.navigate([`/people/${personID}`]);
    }

}
