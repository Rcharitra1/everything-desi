import React from 'react';
import { View, Text, StyleSheet, FlatList, Platform, Dimensions } from 'react-native'
import {useSelector} from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'; 
import HeaderButton from '../../components/ui/HeaderButton';
import StoreTab from '../../components/misc/StoreTab';

const StoreHomeScreen = props =>{

    //Need to use dimenstions to better adjist screen

    const stores = useSelector(state=> state.stores.stores);

    const renderItemData = (itemData)=>{
        return<StoreTab imageUrl={itemData.item.imageUrl}
        title={itemData.item.title}
        buttonTitle={'Edit Store'} secondButtonTitle={'View Products'} secondOnPress={()=>{
            props.navigation.navigate('ListStoreProduct',{
                storeId:itemData.item.id,
                headerTitle:itemData.item.title
            })
        }} onPress={()=>{
            props.navigation.navigate('CreateEditStore', {storeId:itemData.item.id, headerTitle:'Edit Store'})
        }}/>
    }

    // console.log(stores);
    return(
        <View style={styles.screen}>
        <FlatList keyExtractor={item=> item.id.toString()} data={stores} renderItem={renderItemData} showsVerticalScrollIndicator={false}  />
        </View>
       
    )
}
const styles = StyleSheet.create({
    screen:{
        alignItems:'center',
    }
})

export const screenOptions = (navData)=>{
    return{
        headerTitle:'All Stores',
        headerRight: ()=>(
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item iconName={Platform.OS==='android'? 'md-add':'ios-add'} onPress={()=>{
                navData.navigation.navigate('CreateEditStore', {headerTitle:'Add Store'})
            }}/>
            </HeaderButtons>
        ),
        headerLeft:()=>(<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item iconName={Platform.OS==='android'? 'md-menu': 'ios-menu'} onPress={()=>{
                navData.navigation.toggleDrawer()
            }}/>
            </HeaderButtons>)
    }
}

export default StoreHomeScreen;