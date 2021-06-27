export const GET_STORE_PRODUCTS = 'GET_STORE_PRODUCTS';
export const SET_ALL_PRODUCTS='GET_ALL_PRODUCTS';
export const GET_DISCOUNTED_PRODUCTS='GET_DISCOUNTED_PRODUCTS';
export const GET_PRODUCT_CATEGORIES='GET_PRODUCT_CATEGORIES';
export const CREATE_PRODUCT='CREATE_PRODUCT';
export const DELETE_PRODUCT='DELETE_PRODUCT';
export const EDIT_PRODUCT='EDIT_PRODUCT';
import { ProductCategories } from '../../constants/Categories';
import {PRODUCTS, FEATURED_PRODUCTS} from '../../dummy-data/dummy-data';
import Product from '../../models/product';

export const getStoreProducts = (storeId)=>{
    return async dispatch=>{
        const response = await fetch(`https://everything-desi-default-rtdb.firebaseio.com/stores/${storeId}/products.json`)
        const resData = await response.json();
        // console.log(resData)
        
        // const storeProducts = PRODUCTS.filter((item)=> item.storeId===storeId)
        const storeProducts=[];
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

    return async dispatch=>{
        const products=[];

        const response = await fetch(`https://everything-desi-default-rtdb.firebaseio.com/stores.json`, {
            method:'GET'
        })

        if(!response.ok)
        {
            throw new Error('Server error')
        }
        const resData = await response.json();

        // for()
        const blankArray=[];
        for (const key in resData)
        {
            blankArray.push(resData[key])
        }
        // console.log(blankArray)
        for(let i=0; i<blankArray.length;i++)
        {
            for(const key in blankArray[i].products)
            {
                products.push(new Product(
                    key,
                    blankArray[i].products[key].title,
                    blankArray[i].products[key].category,
                    blankArray[i].products[key].imageUrl,
                    blankArray[i].products[key].description,
                    blankArray[i].products[key].quantity,
                    blankArray[i].products[key].price,
                    blankArray[i].products[key].storeId,
                    blankArray[i].products[key].discount
                ))
            }
        }

        // console.log(products)

        dispatch({
            type:SET_ALL_PRODUCTS,
            products : products
        })

    }
    
}


// export const getDiscountedProducts = (id)=>{
//     // const discountedProducts = PRODUCTS.filter((item)=> item.storeId===id && item.discount>0)
//     return async dispatch=>{
//         dispatch({
//         type:GET_DISCOUNTED_PRODUCTS,
//         // discountedProducts:discountedProducts,
//         storeId:id
//     })
//     }
// }

export const getProductCategories = ()=>{
    let productCategories=[];
    // for(let i=0; i<PRODUCTS.length;i++)
    // {
    //     if(productCategories.indexOf(PRODUCTS[i].category)<0)
    //     {
    //         productCategories.push(PRODUCTS[i].category)
    //     }
    // }

    for(const key in ProductCategories)
    {
        productCategories.push(ProductCategories[key])
    }

    
    
    // productCategories.sort()
    // console.log(productCategories)
    return{
        type:GET_PRODUCT_CATEGORIES,
        categories : productCategories
    }
}


export const createProduct=(storeId, title, category, imageUrl, description, quantity, price, discount, token)=>{
    return async dispatch=>{
        const response = await fetch(`https://everything-desi-default-rtdb.firebaseio.com/stores/${storeId}/products.json?auth=${token}`,{
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
                id:resData.name,
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
export const deleteProduct=(storeId, productId, token)=>{
    return async dispatch=>{
        const response = await fetch(`https://everything-desi-default-rtdb.firebaseio.com/stores/${storeId}/products/${productId}.json?auth=${token}`,{
            method:'DELETE',
        })
        const resData = await response.json();

        // console.log(resData)

        dispatch({type:DELETE_PRODUCT, productId:productId})
    }
}

export const editProduct= (storeId, productId, category, description, discount, imageUrl, price, quantity, title, token)=>{
    return async dispatch=>{
        const response = await fetch(`https://everything-desi-default-rtdb.firebaseio.com/stores/${storeId}/products/${productId}.json?auth=${token}`, {
            method:'PATCH',
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
            throw new Error('Server error');
        }

        const resData = await response.json();
        console.log(resData);

        dispatch({
            type:EDIT_PRODUCT,
            product:{
                productId,
                category,
                description,
                discount,
                imageUrl,
                price,
                quantity,
                title
            }
        })
    }
}