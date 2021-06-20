
import Store from "../../models/store";
import { GET_STORES, GET_FEATURED_STORES, GET_CATEGORY_STORES, CREATE_STORE } from "../actions/stores";

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

        case CREATE_STORE:
            return{
                ...state,
                stores: state.stores.push(new Store(
                    action.store.id,
                    action.store.title,
                    action.store.imageUrl,
                    action.store.type,
                    action.store.address,
                    action.store.phone,
                    action.store.email,
                    action.store.isFeatured
                ))
            }
    }

    return state;
}