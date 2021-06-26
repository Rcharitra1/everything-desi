import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import {PLACE_ALL_ORDER, PLACE_ORDER} from '../actions/order'; 
import Order from '../../models/order';
import Item from '../../models/Item'


const initialState = {
    cartItems:[]
}

const calculateTotal = (items)=>{
                

                    let totalsObj = {
                        tax:0,
                        total:0,
                        discount:0
                    }

                for(let k=0; k<items.length; k++)
                    {
                        totalsObj.total += items[k].quantity * items[k].price;
                        totalsObj.tax = (totalsObj.total * 0.05);
                        totalsObj.discount += (items[k].price * items[k].quantity * items[k].discount)   
                    }

            // console.log(totalsObj)
                return totalsObj

}
export default (state=initialState, action)=>{
    switch(action.type)
    {
        case ADD_TO_CART:
            const storeId = action.item.storeId;
            if(state.cartItems.findIndex(item=> item.storeId===storeId)>=0)
            {
                const copyCartItems = [...state.cartItems]
                const existingOrder = state.cartItems.find(item=> item.storeId===storeId);
                const objIndex = state.cartItems.findIndex(item=> item.storeId===storeId);

                if(existingOrder.items.findIndex(item=> item.id===action.item.id)>=0)
                {
                    const index = existingOrder.items.findIndex(item=> item.id===action.item.id);
                    existingOrder.items[index].quantity += 1;
                    
                }else
                {
                    existingOrder.items.push(new Item(action.item.id, action.item.title, action.item.price, 1, action.item.discount))

                }

                const {tax, total, discount}=
                calculateTotal(existingOrder.items)

                    existingOrder.total = total;
                    existingOrder.totalDiscount = discount;
                    existingOrder.tax = tax;
                    existingOrder.subTotal = (total - discount + tax)
                copyCartItems.splice(objIndex, 1)

                    copyCartItems.push(existingOrder);
                    copyCartItems.sort((a, b)=> a.id > b.id ? 1 : -1);

                return{
                    ...state,
                    cartItems:[...copyCartItems]
                }
                
            }else
            {
                return{
                    ...state,
                    cartItems: state.cartItems.concat(new Order(
                        new Date().toISOString(),
                        action.item.storeId,
                        new Date().toString(),
                        [new Item(action.item.id, action.item.title, action.item.price, 1, action.item.discount)], action.item.price,
                        (action.item.price - (action.item.price * action.item.discount)+(0.05 * action.item.price)), (action.item.price * 0.05),
                        (action.item.discount * action.item.price),
                        action.item.customerId
                    )).sort((a, b)=> a.id > b.id ? 1 : -1)
                }
            }
           
        case REMOVE_FROM_CART:
            const {id, orderId} = action.removeItem;
            console.log(action.removeItem)

            let copyCartItems = [...state.cartItems];
            let orderItem = copyCartItems.find(item=> item.id===orderId);
            let cartItem = orderItem.items.find(item=> item.id===id);
            const objIndex = copyCartItems.indexOf(orderItem);
            const index = orderItem.items.indexOf(cartItem)
            if(orderItem.items.length===1 && cartItem.quantity==1)
            {
                copyCartItems.splice(objIndex, 1);
              
            }else
            {
                orderItem.items.splice(index, 1);
                if(cartItem.quantity>1)
                {
                    cartItem.quantity -=1;
                    orderItem.items.push(cartItem);
                }
                
                
                const {tax, total, discount}=
                calculateTotal(orderItem.items)

                console.log(discount)

                orderItem.tax = tax;
                orderItem.totalDiscount = discount,
                orderItem.total = total,
                orderItem.subTotal = (total - discount + tax);
                copyCartItems.splice(objIndex, 1);
                copyCartItems.push(orderItem);

            }
            copyCartItems.sort((a, b)=> a.id > b.id ? 1 : -1);

            // console.log(copyCartItems)

            return{
                ...state,
                cartItems: [...copyCartItems]
            }

        case PLACE_ORDER:
           
            const orderItemToRemove = action.orderItem;
            const copyItems = [...state.cartItems];
            const indexToDel = copyItems.indexOf(orderItemToRemove);
            copyItems.splice(indexToDel, 1)
            return{
                ...state,
                cartItems:[...copyItems]
            }
           
        case PLACE_ALL_ORDER:
            return initialState

    }
    return state;
}


