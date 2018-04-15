import { Component } from '@angular/core';

/**
 * Base Component
 **/
@Component({
  selector : 'app-base',
  template: `<ng-content></ng-content>`
})
export class BaseComponent {
    protected myUserID: string;
    protected myPublicKey: string;

    constructor() {
        this.myUserID = sessionStorage.getItem('user_doc_id') || localStorage.getItem('user_doc_id');
        this.myPublicKey = sessionStorage.getItem('public_key') || localStorage.getItem('public_key');
    }
}
