import { TextboxQuestion, NumberInputQuestion } from '../shared/forms/form-element';

const requiredPublicUserDataTyped: Array<{ key: string, type: string}> = [
    // { key: 'productName', type: 'string'},
    // { key: 'productShortDescription', type: 'string'},
    // { key: 'fixedUSDAmount', type: 'number'},
    // { key: 'quantity', type: 'number'},
    // { key: 'productCategory', type: 'string'},
];

const requiredPublicProfileData = [
    'userName',
    'fullName',
    'email',
];

const optionalPublicUserData = [
    'address',
    'profilePicture',
    'birthdate',
    'age'
];

// TODO: https://embed.plnkr.co/plunk/QcCN2I -----> FORM ARRAY

const userFormData = [
    new TextboxQuestion({key: 'userName', label: 'Username', value: '', required: true, order: 1 }),
    new TextboxQuestion({key: 'fullName', label: 'Full name', required: true, order: 1 }),
    new TextboxQuestion({key: 'email', label: 'email', value: '', required: false, order: 1 }),
    // new TextboxQuestion({key: 'address', label: 'address', value: '', required: false, order: 1 }),
    new NumberInputQuestion({key: 'age', label: 'Age', type : 'number', value: 1, required: false, order: 1 }),
];

export {
    requiredPublicUserDataTyped, requiredPublicProfileData,
    optionalPublicUserData, userFormData
};
