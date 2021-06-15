import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import {createDrawerNavigator} from '@react-navigation/drawer'
import AllStoresScreen, {screenOptions as allStoreScreenOptions} from '../screens/customer/AllStoresScreen';
import StoreProductsScreen, {screenOptions as storeProductsScreenOptions} from '../screens/customer/StoreProductsScreen';
import DetailScreen from '../screens/customer/DetailScreen';
import { Platform } from 'react-native'
import Colors from '../constants/Colors';
import FontSizes from '../constants/FontSizes';


const defaultNavOptions = {
    headerStyle:{
        backgroundColor:Platform.OS==='android'? Colors.primary:''
    },
    headerTitleStyle:{
        fontFamily:'roboto',
        fontSize:FontSizes.extraLarge
    },
    headerTintColor:Platform.OS==='android'?'white':Colors.primary
}

const StoreStackNavigator = createStackNavigator();

export const StoreNavigator = ()=>{
    return(
        <StoreStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <StoreStackNavigator.Screen name='AllStores' component={AllStoresScreen} options={allStoreScreenOptions}/>
        <StoreStackNavigator.Screen name='Store' component={StoreProductsScreen} options={storeProductsScreenOptions}/>
        <StoreStackNavigator.Screen name='Details'
        component={DetailScreen}/>
        </StoreStackNavigator.Navigator>
        
    );
}