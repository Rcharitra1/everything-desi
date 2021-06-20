import { StoreCategories } from '../../constants/Categories';
import {STORES, FEATURED_STORES} from '../../dummy-data/dummy-data';
export const GET_STORES = 'GET_STORES';
export const GET_FEATURED_STORES = 'GET_FEATURED_STORES';
export const GET_CATEGORY_STORES='GET_CATEGORY_STORES';
export const CREATE_STORE='CREATE_STORE';
export const EDIT_STORE='EDIT_STORE';
export const DELETE_STORE='DELETE_STORE'
import Store from '../../models/store';



export const getStores = ()=>{
    return async dispatch=>{
        const response = await fetch('https://everything-desi-default-rtdb.firebaseio.com/stores.json');

        const resData = await response.json();

        // console.log(resData)
        dispatch({type:GET_STORES, stores:STORES})

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

export const createStore=(title,imageUrl, type, address, phone, email, isFeatured )=>{

    

    return async dipatch=>{
    //     title='My STore';
    // imageUrl='https://media-cldnry.s-nbcnews.com/image/upload/newscms/2017_26/2053956/170627-better-grocery-store-main-se-539p-2053956.jpg';
    // type= StoreCategories.GROCERY;
    // address='211, 18105, 95th AVe Edmonton';
    // phone='123-345-5668';
    // email='stor1@gmail.com';
    // isFeatured=true

    const response = await fetch('https://everything-desi-default-rtdb.firebaseio.com/stores.json', {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            title,
            imageUrl,
            type,
            address,
            phone,
            email,
            isFeatured
        })
    },
    );

    if(!response.ok)
    {
        throw new Error('Server error')
    }

    const resData = await response.json();

    console.log(resData)
        dipatch({type:CREATE_STORE, store:{
            id:resData.name,
            title,
            imageUrl,
            type,
            address,
            phone,
            email,
            isFeatured
        }})
    }
}