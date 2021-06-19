import React from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { View, Text, StyleSheet, FlatList } from 'react-native'
import CartTab from '../../components/misc/CartTab';
import FontSizes from '../../constants/FontSizes';
import CustomButton from '../../components/ui/CustomButton';
import Colors from '../../constants/Colors';
import * as orderActions from '../../store/actions/order';
const CartScreen = props =>{
    const cartItems = useSelector(state=> state.cart.cartItems);



    const dispatch = useDispatch();
    if(!cartItems || cartItems.length===0)
    {
        return (<View style={styles.noscreen}><Text style={styles.noItems}>No Items In Cart</Text></View>)
    }

    const onPayButtonClick = ()=>{
        // for(let i=0; i<cartItems.length;i++)
        // {
        //     dispatch(orderActions.placeOrder(cartItems[i]))
        // }
        dispatch(orderActions.placeAllOrders(cartItems))
    }


    let totalDue = 0.00;
    if(cartItems)
    {
        for(let i=0; i<cartItems.length; i++)
        {
            totalDue += cartItems[i].subTotal
        }
    }

    const renderItemData = itemData =>{
        return(
           <CartTab 
           item={itemData.item}
           orderId={itemData.item.id}
           date={itemData.item.datePlaced} storeId={itemData.item.storeId} subTotal={itemData.item.subTotal} total={itemData.item.total} tax={itemData.item.tax} totalDiscount={itemData.item.totalDiscount} items={itemData.item.items}/>
        );
    }
    return(
        <View style={styles.screen}>
        <View style={styles.buttonContainer}>
        <CustomButton style={{backgroundColor:Colors.success}} onPress={onPayButtonClick}>Pay ${totalDue.toFixed(2)} and Checkout</CustomButton>
        </View>
        <FlatList data={cartItems} renderItem={renderItemData} keyExtractor={item=> item.id}/>
        </View>
    )
}
const styles = StyleSheet.create({
    screen:{
        marginHorizontal:10
    },
    noscreen:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    noItems:{
        fontSize:FontSizes.extraLarge,
        fontFamily:'roboto'
    },
    buttonContainer:{
        alignItems:'flex-end',
        marginHorizontal:5
    }

})

export default CartScreen;