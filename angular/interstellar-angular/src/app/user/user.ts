import { AssetBalance } from 'app/stellar';

export class User {

    // FB
    id: string;

    userName: string;
    fullName: string;
    email: string;
    birthdate: string;
    age: number;
    address: string;

    // stellar
    publicKey: string;


    // todo: ...
    isValidBuyer: boolean;
    isValidSeller: boolean;

    // todo: ...
    accountCreated: Date;
    numberOfItemsSold: number;

    acceptedAssets: AssetBalance[];
    // acceptedAssets: string[];

    constructor(id: string,
                publicKey: string,
                userName: string = '',
                fullName: string = '',
                email: string = '',
                birthdate: string = '',
                age: number = -1,
                // acceptedAssets: AssetBalance[] = []) {
                acceptedAssets: AssetBalance[] = []) {
                    this.id = id,
                    this.publicKey = publicKey,
                    this.userName = userName,
                    this.fullName = fullName,
                    this.email = email,
                    this.birthdate = birthdate,
                    this.age = age;
                    this.acceptedAssets = acceptedAssets;
                }
}

// export const publicUserData = [
//     'userName',
//     'fullName',
//     'email',
//     'birthdate',
//     'age'
// ];
