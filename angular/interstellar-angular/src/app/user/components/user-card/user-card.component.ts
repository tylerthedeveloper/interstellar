import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'app/user/user';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

    @Input() person: User;
    @Output() notify: EventEmitter<string> = new EventEmitter<string>();

    constructor() { }

    ngOnInit() {
    }

    selectPerson = (personID: string) => {
        console.log(personID)
        this.notify.emit(personID);
    }


}
