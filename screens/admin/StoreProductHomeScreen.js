import React, {useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, Platform, Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'; 
import HeaderButton from '../../components/ui/HeaderButton';
import * as productActions from '../../store/actions/products';
import ProductTab from '../../components/misc/ProductTab';
import FontSizes from '../../constants/FontSizes';

const StoreProductHomeScreen = props =>{
    let storeId = useSelector(state=> state.user.storeId);

    


    if(storeId===null)
    {
        storeId=props.route.params.storeId
    }

    const store = useSelector((state)=> state.stores.stores.find(item=> item.id===storeId))
    // if(!storeId)
    // {
    //     storeId=useSelector(state=> state.user.storeId)
    // }

    console.log(storeId)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(productActions.getStoreProducts(storeId))
    }, [])

    const deleteProduct = (storeId, productId, productTitle)=>{
        Alert.alert(`Delete ${productTitle}`, 'Do you want to delete this product?', [{text:'Confirm', onPress:()=>dispatch(productActions.deleteProduct(storeId, productId)).then(()=>{
            Alert.alert('Successfully Deleted','Product was successfully deleted', [{text:'Okay'}])
        })
        }, {text:'Cancel'}])
    }

    useEffect(() => {
        
        props.navigation.setOptions({
            headerTitle:store.title,
            headerRight:()=>(<HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item iconName={Platform.OS==='android'? 'md-add': 'ios-add'} onPress={()=>{
                    props.navigation.navigate('AddEditProduct', {headerTitle:'Add Product', storeId:storeId})
                }}/></HeaderButtons>)
        })
    }, [])

    const storeProducts = useSelector(state=> state.products.storeProducts);

    if(storeProducts.length===0 || !storeProducts)
    {
        return <View style={styles.screen}><Text style={styles.noProducts}>No products to display</Text></View>
    }

    const renderItemData = (itemData )=>{
        return <ProductTab imageUrl={itemData.item.imageUrl} title={itemData.item.title} price={itemData.item.price} discounted={itemData.item.discount>0? true : false} discount={itemData.item.discount} buttonTitle={'Edit'} secondButtonTitle={'Delete'} onPress={()=>{
            props.navigation.navigate('AddEditProduct', {
                productId : itemData.item.id,
                headerTitle:'Edit Product',
                storeId:storeId
            })
        }} secondOnPress={deleteProduct.bind(this,storeId, itemData.item.id, itemData.item.title )}/>
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
    },
    noProducts:{
        fontFamily:'roboto',
        fontSize:FontSizes.extraLarge
    }
})

export const screenOptions = navData=>{
    const headerTitle=navData.route.params.headerTitle
    return{
        headerTitle:headerTitle,
        
    }
}

export default StoreProductHomeScreen;