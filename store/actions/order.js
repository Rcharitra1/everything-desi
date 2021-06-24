export const PLACE_ORDER = 'PLACE_ORDER';
export const PLACE_ALL_ORDER= 'PLACE_ALL_ORDER';
export const GET_ALL_USER_ORDERS='GET_ALL_USER_ORDERS';
import Item from '../../models/Item';
import Order from '../../models/order';


export const placeOrder= ( orderItem )=>{

    // console.log(orderItem)
    // const paid= true
    // if(paid)
    // {
        return async dispatch=>{

            orderItem.customerId='-McloSKoUX49jJ6kkAr-';


            delete orderItem.id;
            const response = await fetch(`https://everything-desi-default-rtdb.firebaseio.com/users/${orderItem.customerId}/orders.json`, {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(
                    // customerId:orderItem.customerId,
                    // storeId:orderItem.storeId,
                    // subTotal:orderItem.subTotal,
                    // tax:orderItem.tax,
                    // total:orderItem.total,
                    // totalDiscount:orderItem.totalDiscount,
                    // datePlaced:orderItem.datePlaced,
                    // items:[{
                    //     discount:orderItem.items[0].discount,
                    //     id:orderItem.items[0].id,
                    //     price:orderItem.items[0].price,
                    //     quantity:orderItem.items[0].discount,
                    //     title:orderItem.items[0].title
                    // }]
                    orderItem

                )

            })

            if(!response.ok)
            {
                throw new Error('Server error ');
            }
            const resData = await response.json();

            // const jsonLook = JSON.stringify(orderItem)
            // console.log(jsonLook)
            orderItem.id = resData.name
            // orderItem.id='name';
            // console.log(orderItem)
            dispatch({
                type:PLACE_ORDER,
                orderItem:orderItem
            })
            
            
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

    userId='-McloSKoUX49jJ6kkAr-'

    return async dispatch=>{
    const response = await fetch(`https://everything-desi-default-rtdb.firebaseio.com/users/${userId}/orders.json`,{
        method:'GET'
    })

    if(!response.ok)
    {
        throw new Error('Server error')
    }
    const resData = await response.json();
    // console.log(resData)

    const orderList=[];
    for(const key in resData)
    {
        orderList.push(new Order(
            key,
            resData[key].storeId,
            resData[key].datePlaced,
            resData[key].items.map(item=> {
                return new Item(
                    item.id,
                    item.title,
                    item.price,
                    item.quantity,
                    item.discount
                )
            }),
            resData[key].total,
            resData[key].subTotal,
            resData[key].tax,
            resData[key].totalDiscount,
            resData[key].customerId
        ))
    }

    // console.log(orderList)





    
    // console.log('im here')
    dispatch({
        type:GET_ALL_USER_ORDERS,
        orders:orderList
    })
}
}