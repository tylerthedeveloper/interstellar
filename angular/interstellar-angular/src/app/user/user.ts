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



    constructor(id: string,
                publicKey: string,
                userName: string = '',
                fullName: string = '',
                email: string = '',
                birthdate: string = '',
                age: number = -1) {
                    this.id = id,
                    this.publicKey = publicKey,
                    this.userName = userName,
                    this.fullName = fullName,
                    this.email = email,
                    this.birthdate = birthdate,
                    this.age = age;
                }
}

// export const publicUserData = [
//     'userName',
//     'fullName',
//     'email',
//     'birthdate',
//     'age'
// ];
