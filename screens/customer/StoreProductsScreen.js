import React, {useState, useEffect} from 'react';
import { View, FlatList, Text, StyleSheet, ActivityIndicator, Platform, ScrollView, Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import * as productActions from '../../store/actions/products';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/ui/HeaderButton';
import FontSizes from '../../constants/FontSizes'
import Colors from '../../constants/Colors'
import ProductTab from '../../components/misc/ProductTab';
import * as cartActions from '../../store/actions/cart';


const StoreProductsScreen = props =>{

    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch();

    const storeId = props.route.params.storeId;

    const user = useSelector(state=> state.user);

    useEffect(()=>{
        setIsLoading(true)
        dispatch(productActions.setAllProducts());
        dispatch(productActions.getStoreProducts(storeId))
 
        dispatch(productActions.getProductCategories())
        setIsLoading(false)
    }, [setIsLoading])

 



    if(isLoading)
    {
        return <ActivityIndicator size='large' color={Colors.primary} />
    }


    const {storeProducts, productCategories}=useSelector(state=> state.products);

    const discountedProducts = storeProducts.filter(item=> item.discount>0)
    if(storeProducts.length===0 && discountedProducts.length===0)
    {
        return (<View style={styles.screen}><Text style={styles.noProducts}>No Products Available</Text></View>)
    }

    const onSelectClick = (id, title)=>{
        props.navigation.navigate('Details', {
            productId:id,
            productTitle:title
        })
    }

    const onAddToCart = (id,title, price, discount, storeID )=>{
        dispatch(cartActions.addToCart(id, title, price, discount, storeID, user.userId)).then(()=>{
            Alert.alert('Cart', `${title} added to your cart`, [{text:'Okay'}])
        }).catch(err=> console.log(err))
    }

    const renderProduct = itemData =>{
        // console.log(itemData.item)
        return <ProductTab imageUrl={itemData.item.imageUrl} title={itemData.item.title} price={parseFloat(itemData.item.price).toFixed(2)} onPress={onSelectClick.bind(this, itemData.item.id,  itemData.item.title)}
        buttonTitle={'Details'}
        secondButtonTitle={'Add To Cart'}
        secondOnPress={onAddToCart.bind(this, itemData.item.id, itemData.item.title, itemData.item.price, itemData.item.discount, itemData.item.storeId)} discounted={itemData.item.discount>0 ? true : false} discount={itemData.item.discount} disabled={itemData.item.quantity<=0 ? true : false}/>
    }

    return(
        <ScrollView style={{backgroundColor:'white'}} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        {  discountedProducts.length>0 &&
            <View style={styles.tabView} >
            <Text style={styles.categoryTitle}>Discounted Products</Text>
            <FlatList data={discountedProducts} horizontal={true} keyExtractor={item=> item.id.toString()} renderItem={renderProduct}  showsVerticalScrollIndicator ={false}
            showsHorizontalScrollIndicator={false}/>
            </View>
        }
        
        <View style={styles.tabView}>
        <Text style={styles.categoryTitle}>All Products</Text>
        <FlatList data={storeProducts} horizontal={true} keyExtractor={item=> item.id.toString()}
        showsVerticalScrollIndicator ={false}
        showsHorizontalScrollIndicator={false} renderItem={renderProduct}/>
        </View>
        {productCategories && productCategories.map(category => {
            const categoryProducts = storeProducts.filter(item=> item.category===category);
            if(categoryProducts.length>0)
            { return (
                <View style={styles.tabView} key={category}>
                <Text style={styles.categoryTitle}>{category.slice(0, 1).toUpperCase()+category.slice(1, category.length)}</Text>
                <FlatList data = {categoryProducts} horizontal={true} renderItem={renderProduct} keyExtractor={item=> item.id.toString()}  showsVerticalScrollIndicator ={false}
                showsHorizontalScrollIndicator={false}/>
                </View>
            );
            }
           
        })}
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
        headerRight:()=>(<HeaderButtons HeaderButtonComponent={HeaderButton}><Item iconName={Platform.OS==='android'? 'md-cart':'ios-cart'} onPress={()=>{
            navData.navigation.navigate('Cart')
        }}/></HeaderButtons>)

    }
}

export default StoreProductsScreen;