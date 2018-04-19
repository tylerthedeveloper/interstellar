import { Component } from '@angular/core';
import { AssetBalance } from 'app/stellar';

/**
 * Base Component
 **/
@Component({
  selector : 'app-base',
  template: `<ng-content></ng-content>`
})
export class BaseComponent {
    protected myBaseUserID: string;
    protected myBasePublicKey: string;
    protected myBaseSeedKey: string;
    protected myBaseBalances: AssetBalance[] = [];

    constructor() {
        this.myBaseUserID = sessionStorage.getItem('user_doc_id') || localStorage.getItem('user_doc_id');
        this.myBasePublicKey = sessionStorage.getItem('public_key') || localStorage.getItem('public_key');
        this.myBaseSeedKey = sessionStorage.getItem('seed_key') || localStorage.getItem('seed_key');
        this.myBaseBalances = <AssetBalance[]> JSON.parse(sessionStorage.getItem('my_balances') || localStorage.getItem('balances'));
    }
}
