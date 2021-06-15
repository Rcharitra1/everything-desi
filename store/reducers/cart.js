import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import Order from '../../models/order';
import Item from '../../models/Item'
import { indexOf } from "lodash";

const initialState = {
    cartItems:[]
}

export default (state=initialState, action)=>{
    switch(action.type)
    {
        case ADD_TO_CART:
            const storeId = action.item.storeId;

            if(state.cartItems.index(item=> item.storeId===storeId)>=0)
            {
                const copyCartItems = [...state.cartItems]
                const existingOrder = state.cartItems.find(item=> item.storeId===storeId);
                const objIndex = state.cartItems.index(item=> item.storeId===storeId);

                if(existingOrder.items.index(item=> item.id===action.item.id)>=0)
                {
                    const index = existingOrder.items.index(item=> item.id===action.item.id);
                    existingOrder.items[index].quantity += 1;
                    existingOrder.total += existingOrder.items[index].price;

                    copyCartItems.filter(item=> indexOf(item)===index);
                    copyCartItems.push(existingOrder);
                }else
                {
                    existingOrder.items.push(new Item(action.id, action.title, action.price, 1))
                    copyCartItems.filter(item=> indexOf(item)===index);
                    copyCartItems.push(existingOrder);
                }

                return{
                    ...state,
                    cartItems:[...copyCartItems]
                }
                
            }else
            {
                return{
                    ...state,
                    cartItems: cartItems.concat(new Order(
                        new Date().toISOString(),
                        action.item.storeId,
                        new Date().toString(),
                        [new Item(action.id, action.title, action.price, 1)], action.price
                    ))
                }
            }
           
        case REMOVE_FROM_CART:
            return{
                ...state,
                cartItems
            }
    }
    return state;
}