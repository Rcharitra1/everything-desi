import React, {useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, Platform } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'; 
import HeaderButton from '../../components/ui/HeaderButton';
import * as productActions from '../../store/actions/products';
import ProductTab from '../../components/misc/ProductTab';

const StoreProductHomeScreen = props =>{
    const storeId = props.route.params.storeId;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(productActions.getStoreProducts(storeId))
    }, [])


    const storeProducts = useSelector(state=> state.products.storeProducts);

    const renderItemData = (itemData )=>{
        return <ProductTab imageUrl={itemData.item.imageUrl} title={itemData.item.title} price={itemData.item.price} discounted={itemData.item.discount>0? true : false} discount={itemData.item.discount} buttonTitle={'Edit'} secondButtonTitle={'Delete'} onPress={()=>{
            props.navigation.navigate('AddEditProduct', {
                productId : itemData.item.id,
                headerTitle:'Edit Product'
            })
        }} secondOnPress={()=>{}}/>
    }
    return(
        <View style={styles.screen}>
        <FlatList data = {storeProducts} renderItem={renderItemData} keyExtractor={item=> item.id.toString()}/> 
        </View>
       
    )
}
const styles = StyleSheet.create({
    screen:{
        alignItems:'center',
        justifyContent:'center',
        flex:1
    }
})

export const screenOptions = navData=>{
    const headerTitle=navData.route.params.headerTitle
    return{
        headerTitle:headerTitle,
        headerRight:()=>(<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item iconName={Platform.OS==='android'? 'md-add': 'ios-add'} onPress={()=>{
                navData.navigation.navigate('AddEditProduct', {headerTitle:'Add Product'})
            }}/></HeaderButtons>)
    }
}

export default StoreProductHomeScreen;