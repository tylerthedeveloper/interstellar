export class User {

    // FB
    id: string;
    // ...

    userName: string;
    fullName: string;
    email: string;
    birthdate: string;
    age: number;

    // stellar
    publicKey: string;
    isValidBuyer: boolean;
    isValidSeller: boolean;

    // constructor() {}
    constructor(id: string = '',
                publicKey: string = '',
                userName: string = '',
                fullName: string = '',
                email: string = '',
                birthdate: string = '',
                age: number = -1) {}
}

export const publicUserData = [
    'userName',
    'fullName',
    'email',
    'birthdate',
    'age'
];
