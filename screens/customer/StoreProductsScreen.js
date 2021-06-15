import React, {useState, useEffect} from 'react';
import { View, FlatList, Text, StyleSheet, ActivityIndicator, Platform, ScrollView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import * as productActions from '../../store/actions/products';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/ui/HeaderButton';
import FontSizes from '../../constants/FontSizes'
import Colors from '../../constants/Colors'
import ProductTab from '../../components/misc/ProductTab';

const StoreProductsScreen = props =>{

    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch();

    const storeId = props.route.params.storeId;

    useEffect(()=>{
        setIsLoading(true)
        dispatch(productActions.getStoreProducts(storeId))
        dispatch(productActions.getDiscountedProducts(storeId))
 
        dispatch(productActions.getProductCategories())
        setIsLoading(false)
    }, [setIsLoading])



    if(isLoading)
    {
        return <ActivityIndicator size='large' color={Colors.primary} />
    }


    const {products, discountedProducts, categories}=useSelector(state=> state.products);

    if(products.length===0 && discountedProducts.length===0)
    {
        return (<View style={styles.screen}><Text style={styles.noProducts}>No Products Available</Text></View>)
    }

    const renderProduct = itemData =>{
        return <ProductTab imageUrl={itemData.item.imageUrl} title={itemData.item.title} price={itemData.item.price.toFixed(2)}/>
    }

    return(
        <ScrollView style={{backgroundColor:'white'}}>
        <View style={styles.tabView} >
        <Text style={styles.categoryTitle}>Discounted Products</Text>
        <FlatList data={discountedProducts} horizontal={true} keyExtractor={item=> item.id.toString()} renderItem={renderProduct}/>
        </View>
        <View style={styles.tabView}>
        <Text style={styles.categoryTitle}>All Products</Text>
        <FlatList data={products} horizontal={true} keyExtractor={item=> item.id.toString()} renderItem={renderProduct}/>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    noProducts:{
        fontFamily:'roboto',
        fontSize:FontSizes.extraLarge
    },
    categoryTitle:{
        fontFamily:'roboto-bold',
        fontSize: FontSizes.large,
        marginHorizontal:10
    },
    tabView:{
        marginTop:20
    }

})

export const screenOptions = navData =>{
    const headerTitle = navData.route.params.storeTitle;
    return{
        headerTitle:headerTitle,
        headerRight:()=>(<HeaderButtons HeaderButtonComponent={HeaderButton}><Item iconName={Platform.OS==='android'? 'md-cart':'ios-cart'}/></HeaderButtons>)

    }
}

export default StoreProductsScreen;