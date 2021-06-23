import { StoreCategories } from '../../constants/Categories';
import {STORES, FEATURED_STORES} from '../../dummy-data/dummy-data';
import {ROLE_STORE_ADMIN} from '../../constants/Roles'; 
export const GET_STORES = 'GET_STORES';
export const GET_FEATURED_STORES = 'GET_FEATURED_STORES';
export const GET_CATEGORY_STORES='GET_CATEGORY_STORES';
export const CREATE_STORE='CREATE_STORE';
export const EDIT_STORE='EDIT_STORE';
export const DELETE_STORE='DELETE_STORE'
import Store from '../../models/store';
import apiKey from '../../project_api/apiKey';
// import { StoreCategories } from '../../constants/Categories';



export const getStores = ()=>{
    return async dispatch=>{
        const response = await fetch('https://everything-desi-default-rtdb.firebaseio.com/stores.json');

        const resData = await response.json();

        const storesFromWeb = [];

        // console.log(resData)

        for(const key in resData)
        {
            storesFromWeb.push(new Store(
                key,
                resData[key].title,
                resData[key].imageUrl,
                resData[key].type,
                resData[key].address,
                resData[key].phone,
                resData[key].email,
                resData[key].isFeatured

            ))

        }

        const combinedStores = STORES.concat(storesFromWeb)


        dispatch({type:GET_STORES, stores:combinedStores})

    }
}

export const getFeaturedStore = ()=>{
    


    return async dispatch=>{
        const response = await fetch('https://everything-desi-default-rtdb.firebaseio.com/stores.json');

    const resData = await response.json();

    const featuredStores = [];

    for(const key in resData)
    {
        if(resData[key].isFeatured)
        {
            featuredStores.push(new Store(
                key,
                resData[key].title,
                resData[key].imageUrl,
                resData[key].type,
                resData[key].address,
                resData[key].phone,
                resData[key].email,
                resData[key].isFeatured
            ))
        }
    }
        dispatch({type:GET_FEATURED_STORES, featuredStores})
    }
}

export const getCategoryStores =()=>{




    const storeCategories = [];

    for(const key in StoreCategories)
    {
        storeCategories.push(StoreCategories[key])
    }


    return{
        type:GET_CATEGORY_STORES,
        storeCategories:storeCategories
    }

}

export const createStore=(title,imageUrl, type, address, phone, email, isFeatured )=>{

    

    return async dispatch=>{
    

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

    // console.log(resData)

    const userResponse = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey.apiKey}`, {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            email:email,
            password:'123456',
            returnSecureToken:false

        })

    } )

    const userResData = await userResponse.json();
    // console.log(userResData); 

    const createUserAccount = await fetch(`https://everything-desi-default-rtdb.firebaseio.com/users.json`, {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            userId: userResData.localId,
            role:ROLE_STORE_ADMIN,
            storeId:resData.name,
            name:title,
            address:address,
            phone:phone,
            email:email
        })
    })

    const createUserResponse = await createUserAccount.json();
    // console.log(createUserResponse)

        dispatch({type:CREATE_STORE, store:{
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



export const editStore=(storeId, title,imageUrl, type, address, phone, email, isFeatured )=>{


    return async dispatch=>{
        const response = await fetch(`https://everything-desi-default-rtdb.firebaseio.com/stores/${storeId}.json`, {
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                title,
                imageUrl,
                type,
                address,
                phone,
                email,
                isFeatured
            })
        })

        if(!response.ok)
        {
            throw new Error('Server error')
        }

        const resData = await response.json()
        console.log(resData);
        dispatch({
            type:EDIT_STORE,
            store:{
                id:storeId,
                title,
                imageUrl,
                type,
                address,
                phone,
                isFeatured
            }
        })
    }

}

export const deleteStore = (storeId)=>{
    return async dispatch=>{
        const response = await fetch(`https://everything-desi-default-rtdb.firebaseio.com/stores/${storeId}.json`, {
            method:'DELETE'
        })

        const resData = await response.json();

       dispatch({
           type:DELETE_STORE,
           storeId
       })
    }
}