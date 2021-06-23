
import Store from "../../models/store";
import { GET_STORES, GET_FEATURED_STORES, GET_CATEGORY_STORES, CREATE_STORE, EDIT_STORE, DELETE_STORE } from "../actions/stores";

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
        case EDIT_STORE:
            const copyStores = [...state.stores];
            const updatedStoreIndex=copyStores.findIndex((item)=> item.id===action.store.id);

            copyStores[updatedStoreIndex].title= action.store.title;
            copyStores[updatedStoreIndex].imageUrl=action.store.imageUrl;
            copyStores[updatedStoreIndex].type=action.store.type;
            copyStores[updatedStoreIndex].address=action.store.address,
            copyStores[updatedStoreIndex].phone=action.store.phone,
            copyStores[updatedStoreIndex].isFeatured=action.store.isFeatured;

            return{
                ...state,
                stores:[...copyStores]
            }

        case DELETE_STORE:
            const copyStoresToDelete = [...state.stores];
            const storeIndex = copyStoresToDelete.findIndex(item=> item.id===action.storeId)
            if(copyStores[storeIndex].isFeatured)
            {
                copyStoresToDelete.splice(storeIndex, 1);

                return{
                    ...state,
                    stores:[...copyStoresToDelete],
                    featuredStores: state.featuredStores.filter(item=> item.id===action.storeId)
                }

            }else
            {
                copyStoresToDelete.splice(storeIndex, 1);
                return{
                    ...state,
                    store:[...copyStoresToDelete]
                }
            }


    }

    return state;
}