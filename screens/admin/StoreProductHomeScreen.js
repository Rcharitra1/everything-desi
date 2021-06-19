import React, {useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, Platform } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'; 
import HeaderButton from '../../components/ui/HeaderButton';
import * as productActions from '../../store/actions/products';

const StoreProductHomeScreen = props =>{
    const storeId = props.route.params.storeId;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(productActions.getStoreProducts(storeId))
    }, [])

    const storeProducts = useSelector(state=> state.products.storeProducts);

    console.log(storeProducts)
    return(
        <View style={styles.screen}>
        <Text>Add/Edit Screen</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    screen:{
        flex: 1,
        alignItems:'center',
        justifyContent:'center'
    }
})

export const screenOptions = navData=>{
    return{
        headerTitle:'Store Home',
        headerRight:()=>(<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item iconName={Platform.OS==='android'? 'md-add': 'ios-add'}/></HeaderButtons>)
    }
}

export default StoreProductHomeScreen;