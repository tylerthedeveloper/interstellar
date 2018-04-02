import { AssetBalance } from 'app/stellar';
import { Product } from 'app/marketplace/_market-models/product';
import { TransactionGroup } from './transaction-group';

export class Order {

    userID: string;
    orderID: string;
    timestamp: string;

    transactions: Array<TransactionGroup>;

    constructor(userID: string,
                orderID: string,
                transactions: Array<TransactionGroup>) {
                    this.userID = userID,
                    this.orderID = orderID,
                    this.transactions = transactions;
                }
}
