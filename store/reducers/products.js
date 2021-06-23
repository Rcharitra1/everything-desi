import { GET_DISCOUNTED_PRODUCTS, GET_PRODUCT_CATEGORIES, GET_STORE_PRODUCTS, SET_ALL_PRODUCTS } from "../actions/products";
import {DELETE_STORE} from '../actions/stores';

import {ADD_TO_CART, REMOVE_FROM_CART} from '../actions/cart';

const initialState=
{
    products:[],
    discountedProducts:[],
    storeProducts : [],
    productCategories:[]
}

export default (state=initialState, action)=>{
    switch(action.type)
    {
        case SET_ALL_PRODUCTS:
            return{
                ...state,
                products:action.products
            }
        case GET_STORE_PRODUCTS:
            return{
                ...state,
                storeProducts: action.storeProducts
            }
        case GET_DISCOUNTED_PRODUCTS:
            return{
                ...state,
                discountedProducts:action.discountedProducts
            }
        case GET_PRODUCT_CATEGORIES:
            return{
                ...state,
                productCategories:action.categories
            }
        case ADD_TO_CART:{
            const productId = action.item.id;
            const copyProducts = [...state.products];



            const productIndex = copyProducts.findIndex(item=> item.id ===productId);

            copyProducts[productIndex].quantity -=1;
            
            // console.log(copyProducts)
            return{
                ...state,
                products: [...copyProducts]
            }

          

        }

        case REMOVE_FROM_CART:{
            const productId = action.removeItem.id;
            const copyProducts = [...state.products];


            
            const productIndex = copyProducts.findIndex(item=> item.id ===productId);
     

            copyProducts[productIndex].quantity +=1;
            
            // console.log(copyProducts)
            return{
                ...state,
                products: [...copyProducts]
            }
        }
        case DELETE_STORE:

            const copyStoreProducts = [...state.storeProducts];
            let isCurrentStore=false;
            for(let i=0; i<copyStoreProducts.length;i++)
            {
                if(copyStoreProducts[i].storeId===action.storeId)
                {
                    isCurrentStore=true
                }
            }

            return{
                ...state,
                products: state.products.filter(item=> item.storeId===action.storeId),
                discountedProducts:state.discountedProducts.filter(item=> item.storeId===action.storeId),
                storeProducts: isCurrentStore? []:[...copyStoreProducts]
            }

    }


    return state;

}