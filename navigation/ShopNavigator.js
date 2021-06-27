import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import {createStackNavigator} from '@react-navigation/stack'
import {createDrawerNavigator, DrawerItemList} from '@react-navigation/drawer'
import AllStoresScreen, {screenOptions as allStoreScreenOptions} from '../screens/customer/AllStoresScreen';
import StoreProductsScreen, {screenOptions as storeProductsScreenOptions} from '../screens/customer/StoreProductsScreen';
import DetailScreen, {screenOptions as detailScreenOptions} from '../screens/customer/DetailScreen';
import { Platform, View, SafeAreaView } from 'react-native'
import Colors from '../constants/Colors';
import FontSizes from '../constants/FontSizes';
import OrderScreen, {screenOptions as orderScreenOptions} from '../screens/customer/OrderScreen'
import CartScreen from '../screens/customer/CartScreen';
import StoreHomeScreen, {screenOptions as storeHomeScreenOptions} from '../screens/admin/StoreHomeScreen';
import StoreProductHomeScreen, {screenOptions as storeProductHomeScreenOptions} from '../screens/admin/StoreProductHomeScreen';

import ProductAddEditScreen, {screenOptions as productAddEditScreenOptions} from '../screens/admin/ProductAddEditScreen';
import EditCreateStoreScreen, {screenOptions as editCreateStoreScreenOptions} from '../screens/admin/EditCreateStoreScreen';
import AuthScreen, {screenOptions as authScreenOptions} from '../screens/auth/AuthScreen';

import PaymentScreen, {screenOptions as paymentScreenOptions} from '../screens/auth/PaymentScreen';
import * as roles from '../constants/Roles';
import CustomButton from '../components/ui/CustomButton';
import * as authActions from '../store/actions/auth';




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
        component={DetailScreen} options={detailScreenOptions}/>
        <StoreStackNavigator.Screen name='Cart' component={CartScreen}/>
        <StoreStackNavigator.Screen name='PaymentScreen' component={PaymentScreen} options={paymentScreenOptions}/>
        </StoreStackNavigator.Navigator>
        
    );
}

const OrderStackNavigator = createStackNavigator();

const OrderNavigator = ()=>{
    return(
        <OrderStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <OrderStackNavigator.Screen name='Orders' component={OrderScreen} options={orderScreenOptions}/>
        </OrderStackNavigator.Navigator>
    );
}

//Role Admin Navigation Options 


const AdminStackNavigator = createStackNavigator();

const AdminNavigator = ()=>{
    return(
        <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <AdminStackNavigator.Screen name='Home' component={StoreHomeScreen} options={storeHomeScreenOptions}/>
        <AdminStackNavigator.Screen name='CreateEditStore' component={EditCreateStoreScreen} options={editCreateStoreScreenOptions}/>
        <AdminStackNavigator.Screen name='ListStoreProduct'
        component={StoreProductHomeScreen} options={storeProductHomeScreenOptions}/>
        <AdminStackNavigator.Screen name='AddEditProduct' options={productAddEditScreenOptions} component={ProductAddEditScreen}/>
        </AdminStackNavigator.Navigator>
    );
}

const StoreAdminStackNavigator = createStackNavigator();
const StoreAdminNavigator=()=>{

    return(
        <StoreAdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <StoreAdminStackNavigator.Screen name='StoreHome' component={StoreProductHomeScreen}/>
        <StoreAdminStackNavigator.Screen name='AddEditProduct' options={productAddEditScreenOptions} component={ProductAddEditScreen}/>
        </StoreAdminStackNavigator.Navigator>
    );
}

const MainDrawerNavigator = createDrawerNavigator();
export const MainNavigator = ()=>{
    const user = useSelector(state=> state.user);
    const dispatch = useDispatch();
    return(
    <MainDrawerNavigator.Navigator drawerContentOptions={{activeTintColor:Colors.primary}} 
    drawerContent={props =>{
        return (<View style={{flex:1}}>
        <SafeAreaView forceInset={{top:'always', horizontal:'never'}}>
        <DrawerItemList {...props}/>
        <View style={{marginHorizontal:15}}>
        <CustomButton style={{width:100}} onPress={()=>{
            dispatch(authActions.logoutUser())
        }}>Logout</CustomButton>
        </View> 
        </SafeAreaView>
        </View>)
    }}
    >
    <MainDrawerNavigator.Screen name='Store' component={StoreNavigator}/>
    {
        (user.role===roles.ROLE_ADMIN || user.role===roles.ROLE_CUSTOMER)
        &&
        <MainDrawerNavigator.Screen name='Orders' component={OrderNavigator}/>
    }
   
    {
        user.role===roles.ROLE_ADMIN && <MainDrawerNavigator.Screen name='AdminStores' component={AdminNavigator}/>
    }
    {
        user.role===roles.ROLE_STORE_ADMIN && <MainDrawerNavigator.Screen name='StoreAdmin' component={StoreAdminNavigator}/>
    }
    </MainDrawerNavigator.Navigator>);
}

const AuthStackNavigator = createStackNavigator();
export const AuthNavigator=()=>{
    return(
        <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <AuthStackNavigator.Screen name='Login' component={AuthScreen} options={authScreenOptions}/>
        </AuthStackNavigator.Navigator>
    );
}