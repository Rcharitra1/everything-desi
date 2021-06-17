import React from 'react';
import { useSelector} from 'react-redux';
import { View, Text, StyleSheet, FlatList } from 'react-native'
import CartTab from '../../components/misc/CartTab';
import FontSizes from '../../constants/FontSizes';

const CartScreen = props =>{
    const cartItems = useSelector(state=> state.cart.cartItems);


    if(!cartItems || cartItems.length===0)
    {
        return (<View style={styles.noscreen}><Text style={styles.noItems}>No Items In Cart</Text></View>)
    }

    const renderItemData = itemData =>{
        return(
           <CartTab 
           orderId={itemData.item.id}
           date={itemData.item.datePlaced} storeId={itemData.item.storeId} subTotal={itemData.item.subTotal} total={itemData.item.total} tax={itemData.item.tax} totalDiscount={itemData.item.totalDiscount} items={itemData.item.items}/>
        );
    }
    return(
        <View style={styles.screen}>
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
    }
})

export default CartScreen;