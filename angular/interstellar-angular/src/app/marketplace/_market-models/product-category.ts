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
}

export const enum ProductCategoryEnum {

    Apparel = 'Apparel',
    Electronics = 'Electronics',
    Food = 'Food',
    Houseware = 'Houseware',
    Software = 'Software',
    Other = 'Other'
}
