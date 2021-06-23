export const GET_STORE_PRODUCTS = 'GET_STORE_PRODUCTS';
export const SET_ALL_PRODUCTS='GET_ALL_PRODUCTS';
export const GET_DISCOUNTED_PRODUCTS='GET_DISCOUNTED_PRODUCTS';
export const GET_PRODUCT_CATEGORIES='GET_PRODUCT_CATEGORIES';
export const CREATE_PRODUCT='CREATE_PRODUCT';
export const DELETE_PRODUCT='DELETE_PRODUCT';
export const EDIT_PRODUCT='EDIT_PRODUCT';
import {PRODUCTS, FEATURED_PRODUCTS} from '../../dummy-data/dummy-data';
import Product from '../../models/product';

export const getStoreProducts = (storeId)=>{
    return async dispatch=>{
        const response = await fetch(`https://everything-desi-default-rtdb.firebaseio.com/stores/${storeId}/products.json`)
        const resData = await response.json();
        // console.log(resData)
        
        const storeProducts = PRODUCTS.filter((item)=> item.storeId===storeId)
        for(const key in resData)
        {
            storeProducts.push(new Product(
                key,
                resData[key].title,
                resData[key].category,
                resData[key].imageUrl,
                resData[key].description,
                resData[key].quantity,
                resData[key].price,
                resData[key].storeId,
                resData[key].discount
            ))
        }
        dispatch({
            type:GET_STORE_PRODUCTS,
            storeProducts : storeProducts
        })
    }
    
}
export const setAllProducts = ()=>{
    return{
        type:SET_ALL_PRODUCTS,
        products : PRODUCTS
    }
}


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


export const createProduct=(storeId, title, category, imageUrl, description, quantity, price, discount)=>{
    return async dispatch=>{
        const response = await fetch(`https://everything-desi-default-rtdb.firebaseio.com/stores/${storeId}/products.json`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                storeId:storeId,
                title:title,
                category:category,
                imageUrl:imageUrl,
                description:description,
                quantity:quantity,
                price:price,
                description:description,
                discount:discount
            })
        })

        if(!response.ok)
        {
            throw new Error('Server error')
        }

        const resData = await response.json();
        console.log(resData)
        dispatch({
            type:CREATE_PRODUCT,
            product:{
                title,
                imageUrl,
                description,
                price,
                quantity,
                storeId,
                category,
                discount

            }
        })
    }
}
export const deleteProduct=(storeId, productId)=>{
    return async dispatch=>{
        const response = await fetch(`https://everything-desi-default-rtdb.firebaseio.com/stores/${storeId}/products/${productId}.json`,{
            method:'DELETE',
        })
        const resData = await response.json();

        console.log(resData)

        dispatch({type:DELETE_PRODUCT})
    }
}