import React, {useState} from 'react';
import { View, Text, FlatList, StyleSheet,Alert, Button, TouchableOpacity, Platform } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import FontSizes from '../../constants/FontSizes';
import CustomButton from '../ui/CustomButton'
import {Ionicons} from '@expo/vector-icons'
import * as cartActions from '../../store/actions/cart';
import * as orderActions from '../../store/actions/order';
const CartTab = props =>{

    // console.log(props.storeId)

    const store = useSelector(state => state.stores.stores.find(item=> item.id===props.storeId))
    const token = useSelector(state=> state.user.token);
    // console.log(token);
    const dispatch = useDispatch();

    const removeFromCart=(id, orderId)=>{
        dispatch(cartActions.removeFromCart(id, orderId))
    }

    const onPayButtonClick = (orderItem)=>{
        dispatch(orderActions.placeOrder(orderItem, props.postId, token))
    }

    const renderDataItem = itemData =>{
        // console.log(itemData.item)
        return(
            <View style={{...styles.header, alignItems:'center', padding:5}}>
            <View style={!props.disablePayment?{...styles.splitView, flexBasis:'12.5%'}:{...styles.splitView, flexBasis:'20%', justifyContent:'space-around'}}>
            <Text style={styles.itemText}>{itemData.item.quantity}</Text>
  
            </View>
            <View style={{...styles.splitView, flexBasis:'40%'}}>
            <Text style={styles.itemText}>{itemData.item.title}</Text>
            </View>
            <View style={styles.splitView}>
            <Text style={{...styles.itemText, justifyContent:'flex-end'}}>${(itemData.item.price * itemData.item.quantity).toFixed(2)}</Text>
            
            </View>
            {
                !props.disablePayment && <View style={styles.splitView}>
                <TouchableOpacity onPress={removeFromCart.bind(this, itemData.item.id, props.orderId)}>
                <Ionicons name={Platform.OS==='android'? 'md-trash':'ios-trash'} size={23} color='red'/>
                </TouchableOpacity>
                </View>
            }
            
           
          
            </View>
        );
    }

    const [isHidden, setIsHidden] = useState(true);
    return(
        <View style={styles.cardView}>
        
        <View style={styles.header}>
        <Text style={styles.order}>{props.orderId.split('-')[1]}</Text>
        
        <Text style={styles.store}>{store.title}</Text>
        <Text style={styles.date}>{new Date(props.date).toLocaleDateString()}</Text>
        </View>
        <View style={styles.totals}>
        <Text style={styles.store}>Summary</Text>
        <View style={styles.header}>
        <Text style={styles.summaryLabel}>Total
        </Text>
        <Text style={styles.summaryText}>${props.total.toFixed(2)}</Text>
        </View>
        <View style={styles.header}>
        <Text style={styles.summaryLabel}>Discount
        </Text>
        <Text style={styles.summaryText}>${props.totalDiscount.toFixed(2)}</Text>
        </View>
        <View style={styles.header}>
        <Text style={styles.summaryLabel}>Taxes
        </Text>
        <Text style={styles.summaryText}>${props.tax.toFixed(2)}</Text>
        </View>
        <View style={styles.header}>
        <Text style={styles.summaryLabel}>Subtotal
        </Text>
        <Text style={{...styles.summaryText, ...styles.highlight}}>${props.subTotal.toFixed(2)}</Text>
        </View>
        </View>
        <View sytle={styles.detailedView}>
        {
            !isHidden &&
            <FlatList data={props.items} keyExtractor={item=> item.id.toString()} renderItem={renderDataItem}/> 
        }
        </View>
        <View style={{alignItems:'center'}}>
        <View style={styles.buttonContainer}>
        
        <CustomButton style={{width:125}} onPress={()=>setIsHidden(!isHidden)}>{isHidden? 'Details':'Hide' }</CustomButton>
        {!props.disablePayment && <CustomButton style={{backgroundColor:Colors.success, width:125}} onPress={onPayButtonClick.bind(this, props.item)}>Pay ${props.subTotal.toFixed(2)}</CustomButton>}
        </View> 
        </View>  
        </View>
    );
}

const styles = StyleSheet.create({
    cardView:{
        shadowColor:'grey',
        shadowOffset:{height:3, width:0},
        elevation:6,
        shadowOpacity:0.5,
        shadowRadius:6,
        backgroundColor:'white',
        margin:10,
        borderRadius:6,
        padding:10,
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between'
       
    },
    order:{
        fontFamily:'roboto',
        fontSize:12,
        flexBasis:'20%'
    },
    store:{
        fontSize:FontSizes.large,
        fontFamily:'roboto-bold',
        textAlign:'center',
        flexBasis:'60%'
    },
    date:{
        fontSize:FontSizes.small,
        fontFamily:'roboto',
        flexBasis:'20%'
    },
    totals:{
        borderRadius:6,
        borderColor:Colors.primary,
        borderWidth:1,
        marginVertical:10,
        padding:10
    },
    summaryLabel:{
        fontFamily:'roboto',
        fontSize:FontSizes.large
    },
    summaryText:{
        fontSize:FontSizes.large,
        fontFamily:'roboto-bold'
    },
    highlight:{
        borderWidth:1,
        borderColor:Colors.success,
        borderRadius:6,
    },
    itemText:{
        fontFamily:'roboto',
        fontSize:FontSizes.medium,
    },
    splitView:{
        flexDirection:'row',
        flexBasis:'25%',
        alignItems:'center',
        justifyContent:'center'
    },
    buttonContainer:{
        justifyContent:'space-between',
        flexDirection:'row'
    },
    
})

export default CartTab;