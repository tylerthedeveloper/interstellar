export class PartialUser {

    id: string;
    userName: string;
    fullName: string;
    email: string;
    age: number;

    // constructor() {}
    constructor(
                userName: string = '',
                fullName: string = '',
                email: string = '',
                age: number = -1) {}
}
