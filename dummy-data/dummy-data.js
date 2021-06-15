import Store from '../models/store';
import Product from '../models/product';

export const STORES = [
    new Store(
        1,
        'Indian Grocers',
        'https://chefsmandala.com/wp-content/uploads/2018/03/garam-masala-spice-scaled.jpg',
        'grocery',
        '123, 18105 95th Ave, Edmonton T5T2Z1',
        '123-456-7890',
        'customercare@indiangrocers.com',
    ),
    new Store(
        2,
        'Indian Grocers and Gujrati Sweets',
        'https://icycanada.com/wp-content/uploads/2020/04/mehrad-vosoughi-yOMsDjT7DUg-unsplash-1-scaled.jpg',
        'grocery',
        '123, 18105 96th Ave, Edmonton T5T2Z1',
        '123-456-7891',
        'customercare@gujgrocers.com',
    ),
    new Store(
        3,
        'Bangla Grocers',
        'https://www.roshoi.info/wp-content/uploads/grocry.png',
        'grocery',
        '211, 185 90th Ave, Calgary T5T3Z3',
        '123-456-7892',
        'customercare@banglagrocers.com',
        true
    ),
    new Store(
        4,
        'Punjab Garments',
        'https://c8.alamy.com/comp/J68K5T/traditional-indian-garment-shop-in-new-market-area-kolkata-india-on-J68K5T.jpg',
        'clothing',
        '211, 1234 95th Ave, Calgary T5T3Z3',
        '123-456-7834',
        'customercare@punjabgarments.com'
    ),
    new Store(
        5,
        'Patiala Clothing',
        'https://c8.alamy.com/comp/ECR4DT/traditional-indian-garment-shop-little-india-george-town-penang-malaysia-ECR4DT.jpg',
        'clothing',
        '222, 185 90th Ave, Toronto O5T3Z3',
        '123-456-7896',
        'customercare@patialaclothing.com'
    ),
    new Store(
        6,
        'Patiala Jewellars',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSMiggCUZIzX-1qyAamI41Pi6wZhKYgMJiwQ&usqp=CAU',
        'accessories',
        '222, 185 92th Ave, Toronto O5T3Z3',
        '123-456-7896',
        'customercare@patialagrocers.com'
    ),
    new Store(
        7,
        'Karachi Sweets',
        'https://thumbs.dreamstime.com/z/tempting-indian-sweets-arranged-display-sale-city-sweet-shop-glass-showcase-premier-customers-132143476.jpg',
        'sweets',
        '222, 185 95th Ave, Toronto O5T3Z3',
        '123-456-7896',
        'customercare@patialagrocers.com'
    ),
    
]

export const FEATURED_STORES = [
    3,
    4,
    7
]

export const FEATURED_PRODUCTS = [
    1, 4, 5, 7
]

export const PRODUCTS =[
    new Product(1, 
        'Thums Up',
        'beverage', 
        'https://cdn.shopify.com/s/files/1/1610/6897/products/thums_up.png?v=1560868072', 
        'Popular Indian Cola Brand', 
        15, 
        1.99, 
        1, 
        0.10),
        new Product(2, 
            'Frozen Okra',
            'vegetables', 
            'https://www.groceryonwheels.org/pub/media/catalog/product/cache/e1df7b37acec9868f8e01d4a6110ef60/l/o/longokra.jpg', 
            'Indian Okra', 
            30, 
            2.09, 
            1, 
            0.10),
        new Product(3,
            'Lijjat Papad',
            'snacks', 
            'https://images-na.ssl-images-amazon.com/images/I/91fNnSGJaOL._SL1500_.jpg', 
            'Branded Papad', 
            0, 
            2.09, 
            1
        ),
        new Product(4,
            'Karachi Halwa',
            'sweets', 
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnkv9EjJLr9JIMu1qMnQrZtmL10-zWIt3GFg&usqp=CAU', 
            'Branded Papa', 
            20, 
            10.99, 
            7,
            0.1
        ),
        new Product(5,
            'Gulab Jaamun',
            'sweets', 
            'https://cdn.shopify.com/s/files/1/1710/0225/products/Coconut_Jamun_600x600.jpg?v=1545202896', 
            'Branded Papad', 
            200, 
            5.99, 
            7,
            0.3
        ),
        new Product(6,
            'Green Suit',
            'clothing', 
            'https://medias.utsavfashion.com/media/catalog/product/cache/1/image/500x/040ec09b1e35df139433887a97daa66f/e/m/embroidered-taffeta-silk-punjabi-suit-in-old-rose-v1-kch1326.jpg', 
            'Green Punjabi Suit', 
            10, 
            159.99, 
            4,
            0.3
        ),
        new Product(7,
            'Black Suit',
            'clothing', 
            'https://assets.panashindia.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/2/7/2786sl01-90001.jpg', 
            'Green Punjabi Suit', 
            6, 
            199.99, 
            4
        ),
        new Product(8,
            'Loop Earring',
            'accessories', 
            'https://cdn.shopify.com/s/files/1/2579/7674/products/AnaLuisaJewelryEarringsHoopEarringsTiaMediumGold.._1080x.jpg?v=1610463650', 
            'Loop Earrings', 
            6, 
            19.99, 
            4
        )
]