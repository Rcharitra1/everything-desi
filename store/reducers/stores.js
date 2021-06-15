
import { GET_STORES, GET_FEATURED_STORES, GET_CATEGORY_STORES } from "../actions/stores";

const initialState = {
    stores:[],
    featuredStores:[],
    storeCategories:[]
}

export default  (state=initialState, action)=>{

    switch(action.type)
    {
        case GET_STORES:
            return{
                ...state,
                stores:action.stores
            }
        case GET_FEATURED_STORES:{
            return{
                ...state,
                featuredStores: action.featuredStores
            }
        }
        case GET_CATEGORY_STORES:
            return{
                ...state,
                storeCategories:action.storeCategories
            }
    }

    return state;
}