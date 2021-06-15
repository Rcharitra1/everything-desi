export const ADD_TO_CART= 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const addToCart=(id, title, price, discount, storeId)=>{

    return{
        type:ADD_TO_CART,
        item:{
            id:id,
            title:title,
            price:price,
            discount:discount
        }
    }
}

export const removeFromCart = (id)=>{

}
