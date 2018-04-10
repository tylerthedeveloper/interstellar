import { ProductCategory } from 'app/marketplace/_market-models/product-category';

export const categories: ProductCategory[] = [
    new ProductCategory('Food & Grocery',
            'For when you need fuel.',
            'https://images.pexels.com/photos/459469/pexels-photo-459469.jpeg?cs=srgb&dl=basil-delicious-food-459469.jpg&fm=jpg'),

    new ProductCategory('Electronics',
      'For work or play.',
      'https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg?cs=srgb&dl=apple-business-computer-39284.jpg&fm=jpg'),

    // tslint:disable-next-line:max-line-length
    new ProductCategory('Sports & Outdoors', 'For your next adventure.', 'https://images.pexels.com/photos/364308/pexels-photo-364308.jpeg?cs=srgb&dl=ball-fun-game-364308.jpg&fm=jpg'),
    // tslint:disable-next-line:max-line-length
    new ProductCategory('Books & Audio', 'For your next rainy day.', 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?cs=srgb&dl=bookcase-books-bookshelves-159711.jpg&fm=jpg'),
    // tslint:disable-next-line:max-line-length
    new ProductCategory('Movies, Music & Games', 'For time with friends.', 'https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg?cs=srgb&dl=cinema-food-movie-theater-33129.jpg&fm=jpg'),
    // tslint:disable-next-line:max-line-length
    new ProductCategory('Clothing, Shoes & Jewelry, ', 'For that next night out.', 'https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?cs=srgb&dl=accessories-accessory-bag-322207.jpg&fm=jpg'),
    // tslint:disable-next-line:max-line-length
    new ProductCategory('Beauty & Health', 'For you.', 'https://images.pexels.com/photos/6148/brush-makeup-make-up-brushes.jpg?cs=srgb&dl=brushes-make-up-makeup-6148.jpg&fm=jpg'),
    // tslint:disable-next-line:max-line-length
    new ProductCategory('Home, Garden, Pets & Tools', 'For your home.', 'https://images.pexels.com/photos/597329/pexels-photo-597329.jpeg?cs=srgb&dl=art-materials-arts-and-crafts-bloom-597329.jpg&fm=jpg'),
  ];

export const categoryTitleList: string[] = categories.map(category => category.category);
//   {
//   'category': 'Food & Grocery',
//   'thumbnailLink': 'For when you need fuel.',
//   'description': 'https://images.pexels.com/photos/459469/pexels-photo-459469.jpeg?cs=srgb&dl=basil-delicious-food-459469.jpg&fm=jpg'
//   }
// ];
