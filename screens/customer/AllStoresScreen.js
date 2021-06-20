import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { View, Text, ScrollView, StyleSheet, FlatList, Platform, ActivityIndicator } from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import HeaderButton from '../../components/ui/HeaderButton'

import * as storeActions from '../../store/actions/stores';
import Colors from '../../constants/Colors';
import FontSizes from '../../constants/FontSizes';
import StoreTab from '../../components/misc/StoreTab';


const AllStoreScreen = props =>{

    const dispatch = useDispatch();


    const [isLoading, setIsLoading]=useState(false);
    useEffect(()=>{
        setIsLoading(true);
        dispatch(storeActions.getStores());
        dispatch(storeActions.getFeaturedStore())
        dispatch(storeActions.getCategoryStores())
        setIsLoading(false)
    },[])

    const allStores = useSelector(state=> state.stores.stores);
    const featuredStores = useSelector(state=> state.stores.featuredStores)

    const storeCategories = useSelector(state=> state.stores.storeCategories);
    storeCategories.sort();

    const renderTabs= (itemData)=>{
        return <StoreTab buttonTitle={'Shop'} title={itemData.item.title} imageUrl={itemData.item.imageUrl} onPress={()=>{
            props.navigation.navigate('Store', {storeId: itemData.item.id, storeTitle: itemData.item.title})
        }}/>
    }

    if(isLoading)
    {
        return <ActivityIndicator size='large' color={Colors.primary} />
    }
    return(
        <ScrollView style={{backgroundColor:'white'}} 
        showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <View style={styles.tabletView}>
        <Text style={styles.categoryTitle}>Featured Stores</Text>
        <FlatList data={featuredStores} horizontal={true} renderItem={renderTabs} 
        keyExtractor={(item)=> item.id.toString()}
        showsVerticalScrollIndicator ={false}
        showsHorizontalScrollIndicator={false}
        />
        </View>
        <View style={styles.tabletView}>
        <Text style={styles.categoryTitle}>All Stores</Text>
        <FlatList data={allStores} horizontal={true} renderItem={renderTabs} 
        keyExtractor={(item)=> item.id.toString()}
        showsVerticalScrollIndicator ={false}
        showsHorizontalScrollIndicator={false}
        />
        </View>
        {storeCategories && storeCategories.map((type)=>{
            const categoryStores = allStores.filter((item)=> item.type===type)
            return(
                <View key={type} style={styles.tabletView}>
            <Text style={styles.categoryTitle}>{type.toString().slice(0, 1).toUpperCase()+type.toString().slice(1, type.length)}</Text>
            <FlatList data={categoryStores} horizontal={true} renderItem={renderTabs} 
            keyExtractor={(item)=> item.id.toString()}  showsVerticalScrollIndicator ={false}
            showsHorizontalScrollIndicator={false}/>
            </View>
            );
        })}
      

        </ScrollView>
    )
}
const styles = StyleSheet.create({
    
    tabletView:{
        borderBottomColor:Colors.secondary,
        borderBottomWidth:1,
        marginHorizontal:10,
        marginTop:20
    },
    categoryTitle:{
        fontFamily:'roboto-bold',
        fontSize: FontSizes.large,
        marginHorizontal:10
    }
})

export const screenOptions = (navData)=>
{
    return {
        headerTitle:'Stores',
        headerRight:()=><HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item iconName={Platform.OS==='android' ? 'md-cart' : 'ios-cart'} onPress={()=>{
            navData.navigation.navigate('Cart')
        }}/>
        </HeaderButtons>,
        headerLeft:()=><HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item iconName={Platform.OS==='android'? 'md-menu':'ios-menu'} onPress={()=>{
            navData.navigation.toggleDrawer()
        }}/></HeaderButtons>
    };
}

export default AllStoreScreen;