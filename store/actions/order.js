export const PLACE_ORDER = 'PLACE_ORDER';
export const PLACE_ALL_ORDER= 'PLACE_ALL_ORDER';
export const GET_ALL_USER_ORDERS='GET_ALL_USER_ORDERS';


export const placeOrder= ( orderItem )=>{

    // console.log(orderItem)
    // const paid= true
    // if(paid)
    // {
        return{
            type:PLACE_ORDER,
            orderItem:orderItem
            
        }
    // }
    
}

export const placeAllOrders = (orderItems)=>{
    // const paid=true
    // if(paid)
    // {
        return{
            type:PLACE_ALL_ORDER,
            orderItems:orderItems
        }
    // }
}


export const getAllUserOrders = (userId)=>{

    userId='customer1'
    console.log('im here')
    return{
        type:GET_ALL_USER_ORDERS,
        userId:userId
    }
}