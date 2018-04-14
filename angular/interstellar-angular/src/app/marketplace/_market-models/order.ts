import { TransactionGroup } from './transaction';

export class Order {

    userID: string;
    orderID: string;
    timestamp: string;
    transactionsGroups: Array<TransactionGroup>;

    constructor(userID: string,
                orderID: string,
                transactionsGroups: Array<TransactionGroup>) {
                    this.userID = userID,
                    this.orderID = orderID,
                    this.transactionsGroups = transactionsGroups;
                }
}

// export const enum OrderType {
//     Purchase = 'Purchase',
//     Sale = 'Sale',
//     Other = 'Other'
// }
