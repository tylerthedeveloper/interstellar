export class User {

    //FB
    id: string;
    //...

    userName: string;
    fullName: string;
    email: string;
    birthdate: string;
    age: number;
    
    //stellar
    publicKey: string;   
    isValidBuyer: boolean;
    isValidSeller: boolean;
    
    
    constructor(id: string, publicKey: string) {}
    
    
}