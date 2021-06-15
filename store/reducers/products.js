import { GET_DISCOUNTED_PRODUCTS, GET_FEATURED_PRODUCTS, GET_PRODUCT_CATEGORIES, GET_STORE_PRODUCTS } from "../actions/products";

const initialState=
{
    products:[],
    discountedProducts:[],
    productCategories:[]
}

export default (state=initialState, action)=>{
    switch(action.type)
    {
        case GET_STORE_PRODUCTS:
            return{
                ...state,
                products: action.products
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
    }
    return state;

}