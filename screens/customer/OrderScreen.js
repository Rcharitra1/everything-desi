import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import CartTab from '../../components/misc/CartTab';
import FontSizes from '../../constants/FontSizes';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/ui/HeaderButton';
import * as orderActions from '../../store/actions/order'
import Colors from '../../constants/Colors';
const OrderScreen = props =>{
    const orders = useSelector(state=> state.orders.orders);


    // console.log(orderActions.getAllUserOrders())

    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true)
        dispatch(orderActions.getAllUserOrders('customer1'));
        setIsLoading(false)
    }, [])

    if(isLoading)
    {
        return <ActivityIndicator size='large' color={Colors.primary}/>
    }
    if(!orders || orders.length===0)
    {
        return (<View style={styles.noscreen}><Text style={styles.noItems}>No Past Orders</Text></View>)
    }


    const renderItemData = itemData =>{
        return(
           <CartTab 
           disablePayment={true}
           item={itemData.item}
           orderId={itemData.item.id}
           date={itemData.item.datePlaced} storeId={itemData.item.storeId} subTotal={itemData.item.subTotal} total={itemData.item.total} tax={itemData.item.tax} totalDiscount={itemData.item.totalDiscount} items={itemData.item.items}/>
        );
    }
    return(
        <View style={styles.screen}>
        <FlatList data={orders} renderItem={renderItemData} keyExtractor={item=> item.id}/>
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

export const screenOptions = (navData)=>{
    return {
        headerTitle:'Your Orders',
       
        headerLeft:()=><HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item iconName={Platform.OS==='android'? 'md-menu':'ios-menu'} onPress={()=>{
            navData.navigation.toggleDrawer()
        }}/></HeaderButtons>
    };
}

export default OrderScreen;