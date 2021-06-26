export const ADD_TO_CART= 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const addToCart=(id, title, price, discount, storeId, customerId)=>{

    return async dispatch=>{
        dispatch({
            type:ADD_TO_CART,
            item:{
                id:id,
                title:title,
                price:price,
                discount:discount,
                storeId:storeId,
                customerId:customerId
            }
        })
    }
    
}

export const removeFromCart = (id, orderId)=>{

    return async dispatch=>{
        dispatch({
            type:REMOVE_FROM_CART,
            removeItem:{
                id:id,
                orderId:orderId
            }
        })
        
    }
}
