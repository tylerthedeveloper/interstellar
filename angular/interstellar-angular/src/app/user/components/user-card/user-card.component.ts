import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { User } from '@firebase/auth-types';

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
        this.notify.emit(personID);
    }


}
