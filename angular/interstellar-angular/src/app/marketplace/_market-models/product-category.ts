export class ProductCategory {

    productCategoryEnum: ProductCategoryEnum;
    category: string;
    thumbnailLink: string;
    description: string;

    constructor(category: string,
                description: string,
                thumbnailLink: string) {
                    
                this.category = category;
                this.description = description;
                this.thumbnailLink = thumbnailLink;
    }
};

export const enum ProductCategoryEnum {

    apparel,
    electronics,
    food,
    houseware,
    software,

    other

};