export const GET_STORE_PRODUCTS = 'GET_STORE_PRODUCTS';
// export const GET_FEATURED_PRODUCTS='GET_FEATURED_PRODUCTS';
export const GET_DISCOUNTED_PRODUCTS='GET_DISCOUNTED_PRODUCTS';
export const GET_PRODUCT_CATEGORIES='GET_PRODUCT_CATEGORIES';
import {PRODUCTS, FEATURED_PRODUCTS} from '../../dummy-data/dummy-data';

export const getStoreProducts = (id)=>{
    const storeProducts = PRODUCTS.filter((item)=> item.storeId===id)
    return{
        type:GET_STORE_PRODUCTS,
        products : storeProducts
    }
}

// export const getFeaturedProducts = (id)=>{
//     const featuredProducts = PRODUCTS.filter((item)=> item.storeId===id && FEATURED_PRODUCTS.indexOf(item.id)>=0)
//     return{
//         type: GET_FEATURED_PRODUCTS,
//         featuredProducts: featuredProducts
//     }
// }

export const getDiscountedProducts = (id)=>{
    const discountedProducts = PRODUCTS.filter((item)=> item.storeId===id && item.discount>0)
    return{
        type:GET_DISCOUNTED_PRODUCTS,
        discountedProducts:discountedProducts
    }
}

export const getProductCategories = ()=>{
    let productCategories=[];
    for(let i=0; i<PRODUCTS.length;i++)
    {
        if(productCategories.indexOf(PRODUCTS[i].category)<0)
        {
            productCategories.push(PRODUCTS[i].category)
        }
    }

    productCategories.sort()
    return{
        type:GET_PRODUCT_CATEGORIES,
        categories : productCategories
    }
}