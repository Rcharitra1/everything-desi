import React from 'react';
import { TouchableNativeFeedback, StyleSheet, View, Image, Text, TouchableOpacity, Platform, ImageBackground } from 'react-native'
import CustomButton from '../ui/CustomButton';
import Colors from '../../constants/Colors';
import FontSizes from '../../constants/FontSizes';

const ProductTab = props =>{
    let TouchUI = TouchableOpacity;
    if(Platform.OS==='android' && Platform.Versio>=21){
        TouchUI = TouchableNativeFeedback
    }

    let discountedText = <View><Text style={styles.discountedPrice}>${props.price}</Text><Text style={styles.price}>${(props.price * (1-props.discount)).toFixed(2)}</Text></View>
    return(
        <TouchUI activeOpacity={0.25} onPress={props.onPress}>
    
        <View style={styles.tabView}>
        <View style={styles.tabImage}>
        <ImageBackground source={{uri:props.imageUrl}} style={styles.tabBackground}>
        {props.discounted &&
            <Text style={styles.discounted}>{(props.discount * 100).toFixed(0)}% Off</Text>
        }
    
       </ImageBackground>
        </View>
       
       <Text style={styles.tabText}>{props.title}</Text>
       
       {
           props.discounted ? discountedText : <View><Text style={{...styles.discountedPrice, color:'white', textDecorationColor:'white'}}>{props.price}</Text><Text style={styles.price}>${props.price}</Text></View>
           
       }
       
        <View style={styles.buttonContainer}>
        <CustomButton style={{...styles.buttons}} onPress={props.onPress}>Details</CustomButton>
        <CustomButton style={{backgroundColor:Colors.success, ...styles.buttons}} onPress={props.toCart}>Add To Cart</CustomButton>
        </View>
       
        </View>
        </TouchUI>
    )
}

const styles = StyleSheet.create({
    tabView :{
        height: 335,
        width:350,
        backgroundColor:'white',
        borderRadius:6,
        margin:10,
        shadowRadius:6,
        shadowOpacity:0.5,
        shadowOffset:{height:3, width:0},
        elevation:6,
        shadowColor:'grey',
        alignItems:'center',
    },
    tabBackground:{
        height:'100%', 
        width:'100%', 
    },
    tabImage:{
        width:'100%', 
        height:'60%',
        borderTopLeftRadius:6,
        borderTopRightRadius:6,
        overflow: 'hidden'
    },
    tabText:{
        textAlign:'center',
        fontSize:FontSizes.medium,
        fontFamily:'roboto-bold',
        color:Colors.dark
    },
    buttonContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'flex-end'
    },
    price:{
        fontFamily:'roboto',
        fontSize:FontSizes.medium,
        textAlign:'center'
    },

    discountedPrice:{
        textDecorationLine:'line-through',
        textDecorationColor:'red',
        textDecorationStyle:'solid',
        textAlign:'center',
        fontFamily:'roboto',
        fontSize:FontSizes.medium,
    },

    buttons:{
        width: 125
    },
    discounted:{
        backgroundColor:'rgba(127, 235, 19, 0.5)',
        padding: 10,
        color:'white',
        fontFamily:'roboto-bold',
        fontSize: FontSizes.extraLarge,
    }
    
})

export default ProductTab;