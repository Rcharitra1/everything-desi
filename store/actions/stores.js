import {STORES, FEATURED_STORES} from '../../dummy-data/dummy-data';
export const GET_STORES = 'GET_STORES';
export const GET_FEATURED_STORES = 'GET_FEATURED_STORES';
export const GET_CATEGORY_STORES='GET_CATEGORY_STORES';



export const getStores = ()=>{
    return {
        type:GET_STORES,
        stores: STORES
    }
}

export const getFeaturedStore = ()=>{
    let featuredStores = []

    featuredStores = STORES.filter((item)=> FEATURED_STORES.indexOf(item.id)>=0);
    
    return{
        type:GET_FEATURED_STORES,
        featuredStores:featuredStores
    }
}

export const getCategoryStores =()=>{


    let storeCategories = [];
    for(let i=0; i<STORES.length; i++)
    {
        if(storeCategories.indexOf(STORES[i].type)<0)
        {
            storeCategories.push(STORES[i].type);
        }
    }


    return{
        type:GET_CATEGORY_STORES,
        storeCategories:storeCategories
    }

}