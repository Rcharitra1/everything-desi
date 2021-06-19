import { GET_ALL_USER_ORDERS, PLACE_ALL_ORDER, PLACE_ORDER } from "../actions/order";

const initialState = {
    orders:[]
}

export default (state=initialState, action)=>{
    switch(action.type)
    {
        case GET_ALL_USER_ORDERS:
            const copyOrders = [...state.orders];
            copyOrders.filter(item=> item.customerId===action.userId)
            return{
                ...state,
                orders : [...copyOrders]
            }
        case PLACE_ORDER:
            const copyArray = [...state.orders];
            // console.log(copyArray)

            copyArray.push(action.orderItem)
            return{
                ...state,
                orders: [...copyArray]
            }

        case PLACE_ALL_ORDER:
            const copyAllOrders = [...state.orders];

            const orderItems = action.orderItems;


            for(let i=0; i< orderItems.length; i++)
            {
                copyAllOrders.push(orderItems[i])
            }


            return{
                ...state,
                orders: [...copyAllOrders]
            }
    }
    return state;
}

