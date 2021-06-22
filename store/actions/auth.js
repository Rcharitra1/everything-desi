import { ROLE_CUSTOMER } from "../../constants/Roles";

const CREATE_USER='CREATE_ADMIN_USER';
const LOGIN_USER='LOGIN_USER';
export const createUser = (email, password, address, phone, name, role=ROLE_CUSTOMER)=>{
    return async dipatch=>{
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

        console.log(userData)

        dipatch({type:CREATE_USER})
    }
}

const 