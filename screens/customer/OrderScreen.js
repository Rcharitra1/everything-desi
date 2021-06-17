import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native'
import {useSelector} from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/ui/HeaderButton'

const OrderScreen = props =>{

   

    return(
        <View><Text>Your orders</Text></View>
    )
}
const styles = StyleSheet.create({
    screen:{
        flex: 1,
        alignItems:'center',
        justifyContent:'center'
    }
})

export const screenOptions = (navData)=>{
    return{
        headerTitle:'Your Orders',
        headerLeft:()=><HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item iconName={Platform.OS==='android'? 'md-menu':'ios-menu'} onPress={()=>{
            navData.navigation.toggleDrawer()
        }}/></HeaderButtons>
    };
}

export default OrderScreen;