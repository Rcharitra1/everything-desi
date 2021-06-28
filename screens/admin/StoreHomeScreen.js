import React, {useState, useCallback, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, Platform, Dimensions, Alert, ActivityIndicator } from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'; 
import HeaderButton from '../../components/ui/HeaderButton';
import StoreTab from '../../components/misc/StoreTab';
import * as storeActions from '../../store/actions/stores';
import Colors from '../../constants/Colors';

const StoreHomeScreen = props =>{


    const [loading, setLoading] = useState(false)

    const stores = useSelector(state=> state.stores.stores);
    const dispatch = useDispatch();
    const token = useSelector(state=> state.user.token);

    const loadData = useCallback(async ()=>{

        setLoading(true)
        try{
            await dispatch(storeActions.getStores())
        }catch(e)
        {
            console.log(e)
        }
        setLoading(false)
    }, [setLoading])

    useEffect(() => {
        loadData();
    }, [dispatch, loadData])

    useEffect(() => {
        const willFocus = props.navigation.addListener('focus', ()=>{
            loadData();
        })
        return () => {
            willFocus();
        }
    }, [loadData])

    if(loading)
    {
        return <ActivityIndicator size='large' color={Colors.primary} />
    }

    const renderItemData = (itemData)=>{
        return<StoreTab imageUrl={itemData.item.imageUrl}
        thirdButtonHeight={{height:'60%'}}
        title={itemData.item.title}
        buttonTitle={'Edit Store'} secondButtonTitle={'View Products'} secondOnPress={()=>{
            props.navigation.navigate('ListStoreProduct',{
                storeId:itemData.item.id,
                headerTitle:itemData.item.title
            })
        }} onPress={()=>{
            props.navigation.navigate('CreateEditStore', {storeId:itemData.item.id, headerTitle:'Edit Store'})
        }} thirdOnPress={()=>{
            Alert.alert('Confrim Delete', `You sure want to delete ${itemData.item.title}, all products and orders would be deleted`, [{text:'Confirm', onPress:()=> dispatch(storeActions.deleteStore(itemData.item.id, token)).then(()=>{
                Alert.alert('Delete Successfull', 'Store was deleted successfully', [{text:'Okay'}])
            })}, {text:'Cancel'}])
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