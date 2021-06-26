
import {LOGIN_USER, CREATE_USER} from '../actions/auth'
const initialState = {
    userId:null,
    name:null,
    token:null,
    role:null,
    storeId:null,
    postId:null
}


export default (state=initialState, action)=>{
    // console.log('im here')
    switch(action.type)
    {
        
        case CREATE_USER:
            return {
                state,
                token:action.token
            }
        case LOGIN_USER:
            // console.log('I go here')
            return{
                ...state,
                userId:action.user.id,
                name:action.user.name,
                token:action.user.token,
                role:action.user.role,
                storeId:action.user.storeId,
                postId: action.user.postId
            }


    }
    return state;
}