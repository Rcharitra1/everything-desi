import { CREATE_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT, GET_DISCOUNTED_PRODUCTS, GET_PRODUCT_CATEGORIES, GET_STORE_PRODUCTS, SET_ALL_PRODUCTS } from "../actions/products";
import {DELETE_STORE} from '../actions/stores';

import {ADD_TO_CART, REMOVE_FROM_CART} from '../actions/cart';
import Product from "../../models/product";

const initialState=
{
    products:[],
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

        case CREATE_PRODUCT:
            const copyAllProducts = [...state.products];
            const allStoreProductsInState=[...state.storeProducts];

            let isCurrentStoreProduct = false;
            for(let i=0; i<allStoreProductsInState.length;i++)
            {
                if(allStoreProductsInState[i].storeId===action.product.storeId){
                    isCurrentStoreProduct=true;
                }
            }

            const newProduct = new Product(
                action.product.id,
                action.product.title,
                action.product.category,
                action.product.imageUrl,
                action.product.description,
                action.product.quantity,
                action.product.price,
                action.product.storeId,
                action.product.discount
            );
            copyAllProducts.push(newProduct)
            if(isCurrentStoreProduct)
            {
                return{
                    ...state,
                    products:[...copyAllProducts],
                    storeProducts: state.storeProducts.push(newProduct)
                }
            }else
            {
                return{
                    ...state,
                    products:[...copyAllProducts]
                }
            }

        case EDIT_PRODUCT:
            const copyAllEditProducts = [...state.products];
            let allStateStoreProducts=[...state.storeProducts];

            const indexToUpdate= copyAllEditProducts.findIndex((item)=> item.id===action.product.productId);

            copyAllEditProducts[indexToUpdate].category=action.product.category;
            copyAllEditProducts[indexToUpdate].description=action.product.description;
            copyAllEditProducts[indexToUpdate].imageUrl=action.product.imageUrl;
            copyAllEditProducts[indexToUpdate].quantity=action.product.quantity;
            copyAllEditProducts[indexToUpdate].title=action.product.title;
            copyAllEditProducts[indexToUpdate].discount=action.product.discount;
            copyAllEditProducts[indexToUpdate].price=action.product.price;

            let isCurrentStoreEditProduct = false;
            for(let i=0; i<allStateStoreProducts.length;i++)
            {
                if(allStateStoreProducts[i].storeId===action.product.storeId){
                    isCurrentStoreEditProduct=true;
                }
            }

            if(isCurrentStoreEditProduct)
            {
                const indexToUpdated = allStateStoreProducts.findIndex((item)=> item.id===action.productId);
                allStateStoreProducts[indexToUpdated]=copyAllEditProducts[indexToUpdate];
                return{
                    ...state,
                    products:[...copyAllEditProducts],
                    storeProducts: [...allStateStoreProducts]
                }
            }else
            {
                return{
                    ...state,
                    products:[...copyAllEditProducts],
                }
            }

        case DELETE_PRODUCT:
            const storeProductsArray = [...state.storeProducts];

            let isStoreProduct=false;
            for(let i=0; i<storeProductsArray.length;i++)
            {
                if(storeProductsArray[i].storeId===action.product.storeId)
                {
                    isStoreProduct=true;
                }
            }

            if(isStoreProduct)
            {
                
                return{
                    ...state,
                    products : state.products.splice((state.products.findIndex(item=> item.id===action.productId)), 1),
                    storeProducts:state.storeProducts.splice((state.storeProducts.findIndex(item=> item.id===action.productId)), 1)
                }
            }else
            {
                return{
                    ...state,
                    products : state.products.splice((state.products.findIndex(item=> item.id===action.productId)), 1)
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
                storeProducts: isCurrentStore? []:[...copyStoreProducts]
            }

    }


    return state;

}

    // discountedProducts:[],

        // case GET_DISCOUNTED_PRODUCTS:
        //     console.log(state.products)
        //     return{
        //         ...state,
        //         discountedProducts:state.products.filter(item=> item.discount>0 && item.storeId===action.storeId)
        //     }