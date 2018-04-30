import { TextboxQuestion, NumberInputQuestion, CheckBoxQuestion, CheckBoxGroupQuestion } from '../shared/forms/form-element';
import { stellarAssetsMapper2 } from 'app/stellar';
import { stellarTermAssets } from 'app/marketplace/stellar-term/asset.mappers';

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

// https://github.com/philipphalder/angular2-dynamic-forms-advanced/blob/master/src/app/services/question-control.service.ts
// https://github.com/philipphalder/angular2-dynamic-forms-advanced/blob/master/src/app/components/dynamic-form/dynamic-form.component.ts
// https://scotch.io/tutorials/how-to-build-nested-model-driven-forms-in-angular-2

const userFormData = [
    new TextboxQuestion({key: 'userName', label: 'Username', value: '', required: true, order: 1 }),
    new TextboxQuestion({key: 'fullName', label: 'Full name', required: true, order: 1 }),
    new TextboxQuestion({key: 'email', label: 'email', value: '', required: false, order: 1 }),
    new CheckBoxGroupQuestion({
        key: 'acceptedAssets',
        label: 'Accepted Assets',
        // options: stellarAssetsMapper2.map(asset => ({key: asset.asset_type,  value: asset.coin_name})),
        options: stellarTermAssets.map(asset => {
            if (asset === 'XLM') {
                // console.log(asset);
                // FIXME: DO WE HAVE TO ENFORCE XLM???
                return {key: asset,  value: asset, checked: true, disabled: true};
            }
            return {key: asset,  value: asset};
        }),
        order: 4}),
    new NumberInputQuestion({key: 'age', label: 'Age', type : 'number', value: 1, required: false, order: 1 }),
];

export {
    requiredPublicUserDataTyped, requiredPublicProfileData,
    optionalPublicUserData, userFormData
};
