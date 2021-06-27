import { AsyncStorage } from 'react-native'
import {LOGIN_USER, CREATE_USER, LOGOUT_USER, AUTO_LOGIN} from '../actions/auth'
const initialState = {
    userId:null,
    name:null,
    token:null,
    role:null,
    storeId:null,
    postId:null,
    isAuthenticated:false
}


export default (state=initialState, action)=>{
    
    switch(action.type)
    {
        
        case CREATE_USER:
            return {
                state,
                token:action.token
            }
        case LOGIN_USER:
            
            return{
                ...state,
                userId:action.user.id,
                name:action.user.name,
                token:action.user.token,
                role:action.user.role,
                storeId:action.user.storeId,
                postId: action.user.postId,
                isAuthenticated:true
            }

        case LOGOUT_USER:
            return initialState
        case AUTO_LOGIN:

            if(action.role)
            {
                return{
                    ...state,
                    userId:action.userId,
                    name:action.name,
                    token:action.token,
                    role:action.role,
                    storeId:action.storeId? action.storeId:null,
                    postId:action.postId,
                    isAuthenticated:true
                }
            }
            return initialState



    }
    return state;
}