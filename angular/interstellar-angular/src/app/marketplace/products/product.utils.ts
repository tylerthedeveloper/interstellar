import { Product } from '../_market-models/product';
import { requiredPublicProductData } from './product.details';

const validateNewQuantity = (curQuant: number, quantity: number): boolean => {
    if (curQuant === 0 || (curQuant - quantity) < 0) {
        return false;
    } else {
        return true;
    }
};

const isValidProduct = (product: Product): boolean => {
    // todo: check if links are valid
    // check data types
    for (const attr of requiredPublicProductData) {
        if (!product[attr]) {
            return false;
        }
    }
    return true;
};

export { validateNewQuantity, isValidProduct };
