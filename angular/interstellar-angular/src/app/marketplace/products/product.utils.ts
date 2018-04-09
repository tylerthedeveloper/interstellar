import { Product } from '../_market-models/product';
import { requiredPublicProductData, requiredPublicProductDataTyped } from './product.details';

const validateNewQuantity = (curQuant: number, quantity: number): boolean => {
    if (curQuant === 0 || (curQuant - quantity) < 0) {
        return false;
    } else {
        return true;
    }
};


const isValidProductTypes = (product: Product): boolean => {
    // todo: check if links are valid
    // check data types
    for (const attribute of requiredPublicProductDataTyped) {
        const key: string = attribute.key;
        const value: any = product[attribute.key];
        const type: string = attribute.type;
        // console.log(key);
        // console.log(value);
        // console.log(type);
        // console.log(attribute);
        // console.log(product[key] );
        // console.log(typeof product[key] );

        // tODO: NEED TO CHECK FOR OBJECT TYPES ......
        if (!(product[attribute.key] && (typeof product[key] === type))) {
            console.log(attribute);
            return false;
        }
    }
    return true;
};
// const isValidProduct = (product: Product): boolean => {
//     // todo: check if links are valid
//     // check data types
//     for (const attr of requiredPublicProductData) {
//         if (!product[attr]) {
//             console.log(attr);
//             return false;
//         }
//     }
//     return true;
// };

export { validateNewQuantity, isValidProductTypes };
