import { ROLE_CUSTOMER } from "../../constants/Roles";
import { AsyncStorage } from "react-native"; 

import apiKey from "../../project_api/apiKey";
export const CREATE_USER='CREATE_USER';
export const LOGIN_USER='LOGIN_USER';
export const AUTO_LOGIN='AUTO_LOGIN';
export const LOGOUT_USER='LOGOUT_USER';

let timer;
const clearLogoutTimer = ()=>{
    if(timer)
    {
        clearTimeout(timer);
    }

}


const saveCredentials = (token, userId, postId, name, role, storeId)=>{
    AsyncStorage.setItem('userData', JSON.stringify({
        token:token,
        name:name,
        postId:postId,
        role:role,
        userId:userId,
        storeId:storeId
    }))
}



export const logoutUser = ()=>{
    return async dispatch=>{
        await AsyncStorage.removeItem('userData');
        clearLogoutTimer();
        dispatch({type:LOGOUT_USER})
    }
 
}
const setLogoutTimer = (expirationTime)=>{
    return dispatch=>{
        timer = setTimeout(()=>{
            dispatch(logoutUser);
        }, expirationTime)
    }
    
}



export const autoLogin = ()=>{
    return async dispatch=>{
        const userData = await AsyncStorage.getItem('userData');
        const transformedData = JSON.parse(userData)
        // console.log(transformedData)
        dispatch({
            type:AUTO_LOGIN,
            name:transformedData? transformedData.name: null,
            postId:transformedData? transformedData.postId:null,
            storeId:transformedData? transformedData.storeId:null,
            token:transformedData? transformedData.token:null,
            role:transformedData? transformedData.role:null,
            userId:transformedData? transformedData.userId:null
        })
    }
}



export const createUser = (email, password, address, phone, name, role=ROLE_CUSTOMER)=>{
    return async dispatch=>{
        const createUser = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey.apiKey}`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email:email, 
                password:password, returnSecureToken:true})
        })

        const createUserResponse = await createUser.json();
        // console.log(createUserResponse);

        const userData = await fetch(`https://everything-desi-default-rtdb.firebaseio.com/users.json?auth=${createUserResponse.idToken}`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                role:role,
                userId:createUserResponse.localId,
                storeId:null,
                address:address,
                name:name,
                phone:phone,
                email:email
            })
        })

        dispatch({type:CREATE_USER, token:userData})

    }
}

export const loginUser=(email, password)=>{
    return async dispatch=>{
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey.apiKey}`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email:email,
                password:password,
                returnSecureToken:true

            })
        })




        if(!response.ok)
        {
            const errorData = await response.json();
            // console.log(errorData.error.message)

            throw new Error(errorData.error.message)
            // throw new Error(errorData)
            
        };




        const resData = await response.json();
   dispatch(setLogoutTimer(parseInt(resData.expiresIn)*1000))     

        const fetchUser = await fetch(`https://everything-desi-default-rtdb.firebaseio.com/users.json`, {
            method:'GET'
        })

        if(!fetchUser.ok)
        {
            const errorLog = await fetchUser.json();
            console.log(errorLog)
            throw new Error('Server error')
            
        }

        const fetchUserData = await fetchUser.json();

        let userObj

        for(const key in fetchUserData)
        {
            if(fetchUserData[key].userId===resData.localId)
            {
                userObj=fetchUserData[key];
                userObj.key=key
            }
        }


        saveCredentials(resData.idToken, resData.localId, userObj.key, userObj.name, userObj.role, (userObj.storeId? userObj.storeId:null))
  
        dispatch({type:LOGIN_USER,
                    user:{
                    id:resData.localId,
                    token:resData.idToken,
                    name:userObj.name,
                    role:userObj.role,
                    storeId:userObj.storeId? userObj.storeId:null,
                    postId:userObj.key,
                    isAuthenticated:true
                }
                })
    }
}

