import { ROLE_CUSTOMER } from "../../constants/Roles";

import apiKey from "../../project_api/apiKey";
export const CREATE_USER='CREATE_USER';
export const LOGIN_USER='LOGIN_USER';
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
        console.log(createUserResponse);

        const userData = await fetch(`https://everything-desi-default-rtdb.firebaseio.com/users.json`,{
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

        // console.log(userData.idToken)

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

        // console.log(email)

        if(!response.ok)
        {
            const errorData = await response.json();
            console.log(errorData)
            throw new Error('Server error')
            
        };




        const resData = await response.json();
        // console.log(resData);
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

        // console.log(fetchUserData)
        let userObj

        for(const key in fetchUserData)
        {
            if(fetchUserData[key].userId===resData.localId)
            {
                userObj=fetchUserData[key];
                userObj.key=key
            }
        }


        // console.log(userObj)
        

        // console.log('i m here')
  
        dispatch({type:LOGIN_USER,
                    user:{
                    id:resData.localId,
                    token:resData.idToken,
                    name:userObj.name,
                    role:userObj.role,
                    storeId:userObj.storeId? userObj.storeId:null,
                    postId:userObj.key
                }
                })
    }
}