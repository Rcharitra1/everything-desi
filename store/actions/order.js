export const PLACE_ORDER = 'PLACE_ORDER';
export const PLACE_ALL_ORDER= 'PLACE_ALL_ORDER';
export const GET_ALL_USER_ORDERS='GET_ALL_USER_ORDERS';
import Item from '../../models/Item';
import Order from '../../models/order';


export const placeOrder= ( orderItem, postId )=>{

        return async dispatch=>{


            delete orderItem.id;
            const response = await fetch(`https://everything-desi-default-rtdb.firebaseio.com/users/${postId}/orders.json`, {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(orderItem)
            })

            if(!response.ok)
            {
                throw new Error('Server error ');
            }
            const resData = await response.json();


            orderItem.id = resData.name

            dispatch({
                type:PLACE_ORDER,
                orderItem:orderItem
            })
            
            
        }
    // }
    
}

const postOrders = async (orderItem, postId)=>{
    return await fetch(`https://everything-desi-default-rtdb.firebaseio.com/users/${postId}/orders.json`, {
        method:'POST',
        headers:{
            'Content-Type':'application/type'
        },
        body:JSON.stringify(orderItem)
    })
}

export const placeAllOrders = (orderItems, postId)=>{
    return async dispatch=>{

        let results=[];
        Promise.all(
            orderItems.map((orderItem)=>{
                postOrders(orderItem, postId)
            })
        ).then((data)=>{
           results = [...data];
        //    console.log(results)
        }).catch((err)=>{
            console.log(err)
        })

        // if(!results.ok)
        // {
        //     throw new Error('Server error')
        // }

        // const resultsData = await results.json();
        // console.log(resultsData);
        dispatch({
            type:PLACE_ALL_ORDER,
            orderItems:orderItems
        })
    }

       
}


export const getAllUserOrders = (postId)=>{


    return async dispatch=>{
    const response = await fetch(`https://everything-desi-default-rtdb.firebaseio.com/users/${postId}.json`,{
        method:'GET'
    })

    if(!response.ok)
    {
        throw new Error('Server error')
    }
    const resData = await response.json();


    const orderList=[];
    for(const key in resData.orders)
    {
        orderList.push(new Order(
                    key,
                    resData.orders[key].storeId,
                    resData.orders[key].datePlaced,
                    resData.orders[key].items.map(item=> {
                        return new Item(
                            item.id,
                            item.title,
                            item.price,
                            item.quantity,
                            item.discount
                        )
                    }),
                    resData.orders[key].total,
                    resData.orders[key].subTotal,
                    resData.orders[key].tax,
                    resData.orders[key].totalDiscount,
                    resData.orders[key].customerId
                ))
    }

  

    dispatch({
        type:GET_ALL_USER_ORDERS,
        orders:orderList
    })
}
}