import React, {useEffect, useState, useCallback} from 'react';
import { View, Text, ImageBackground, StyleSheet, ScrollView, Alert} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'; 
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/ui/HeaderButton';
import FontSizes from '../../constants/FontSizes';
import Colors from '../../constants/Colors';
import CustomButton from '../../components/ui/CustomButton';
import DisabledButton from '../../components/ui/DisabledButton';
import * as cartActions from '../../store/actions/cart';
import * as productActions from '../../store/actions/products'
const DetailScreen = props =>{


    const {productId} = props.route.params;
    let product = useSelector(state=> state.products.products.find(item=> item.id===productId))

    let store = useSelector(state=> state.stores.stores.find(item=> item.id===product.storeId))
    const dispatch = useDispatch();


    if(!product)
    {
        return<View style={styles.screen}><Text style={styles.noItem}>No product</Text></View>
    }



    const addToCart = ()=>{
        dispatch(cartActions.addToCart(productId, product.title, product.price, product.discount, product.storeId)).then(()=>{
            Alert.alert('Cart', `${product.title} is been added to your cart`, [{text: 'Okay'}])
        }).catch(err=> console.log(err))
    }

    return(
        <ScrollView style={{backgroundColor:'white'}}>
        <ImageBackground source={{uri:product.imageUrl}} style={styles.image}>
        {product.discount>0 && <Text style={styles.discounted}>{(product.discount * 100).toFixed()}% Off</Text>}
        </ImageBackground>
        {
            product.discount>0 ? <View style={styles.priceContainer}><Text style={styles.discountedPrice}>${product.price}</Text><Text style={styles.price}>${(product.price * (1-product.discount)).toFixed(2)}</Text></View> : <View style={styles.priceContainer}><Text style={styles.price}>${product.price}</Text></View>
        }
        <View style={styles.centerContainer}>
        {
            product.quantity> 0 ? <CustomButton style={{marginVertical:10}} onPress={addToCart}>Add To Cart</CustomButton> : <DisabledButton>Out Of Stock</DisabledButton>
        }
        <Text style={styles.description}>{product.description}</Text>
        <View style={styles.seller}><Text style={styles.sellerHead}>Sold By:</Text><Text style={styles.sellerTitle}>{store.title}</Text></View>
        <View style={styles.seller}><Text style={styles.sellerHead}>Ships From:</Text><Text style={styles.sellerTitle}>{store.address}</Text></View>
        </View>
        

       
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    image:{
        height: 250,
        width: '100%'
    },
    discounted:{
        backgroundColor:'rgba(127, 235, 19, 0.5)',
        padding: 10,
        color:'white',
        fontFamily:'roboto-bold',
        fontSize: FontSizes.extraLarge,
    },
    description:{
        textAlign:'center',
        marginVertical:10,
        fontSize:FontSizes.large,
        fontFamily:'roboto'
    },
    discountedPrice:{
        textDecorationColor:'red',
        textDecorationLine:'line-through',
        textDecorationStyle:'solid',
        fontFamily:'roboto',
        fontSize:FontSizes.large,
        marginTop:10
    },
    price:{
        fontFamily:'roboto-bold',
        fontSize:FontSizes.extraLarge,
        borderColor:'red',
        borderWidth:1,
        borderRadius:6,
        padding: 10,
        marginTop:10
    },
    priceContainer:{
        alignItems:'center'
    },
    centerContainer:{
        alignItems:'center'
    },
    sellerHead:{
        textAlign:'center',
        fontFamily:'roboto-bold',
        fontSize:FontSizes.large,
    },
    sellerTitle:{
        textAlign:'center',
        fontFamily:'roboto',
        fontSize:FontSizes.large,
    },
    seller:{
        marginVertical:10
    },
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    noItem:{
        fontFamily:'roboto',
        fontSize:FontSizes.extraLarge
    }
    
})

export const screenOptions = navData =>{
    const headerTitle = navData.route.params.productTitle;
    return{
        headerTitle:headerTitle,
        headerRight:()=>(<HeaderButtons HeaderButtonComponent={HeaderButton}><Item iconName={Platform.OS==='android'? 'md-cart':'ios-cart'} onPress={()=>{
            navData.navigation.navigate('Cart')
        }}/></HeaderButtons>)

    }
}

export default DetailScreen;


// product.quantity> 0 ? <CustomButton style={{marginVertical:10}}>Add To Cart</CustomButton> : 