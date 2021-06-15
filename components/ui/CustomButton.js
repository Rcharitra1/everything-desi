
import React from 'react';
import { View, TouchableOpacity, TouchableNativeFeedback, Text, StyleSheet, Platform } from 'react-native'
import Colors from '../../constants/Colors'; 
import FontSizes from '../../constants/FontSizes';
const CustomButton = props =>{

    let TouchBtn = TouchableOpacity;

    if(Platform.OS==='android' && Platform.Version>=21){
        TouchBtn = TouchableNativeFeedback
    }
    return(
        <TouchBtn activeOpacity={0.25} onPress={props.onPress}>
        <View style={{...styles.buttonContainer, ...props.style}}>
        <Text style={{...styles.buttonText, ...props.textSize}}>{props.children}</Text>
        </View>
        </TouchBtn>
    );
}

const styles = StyleSheet.create({
    buttonContainer:{
        margin: 5,
        padding:10,
        borderRadius:6,
        shadowColor:'grey',
        shadowOffset:{height:5, width:0},
        elevation:10,
        shadowOpacity:0.5,
        shadowRadius:6,
        backgroundColor:Colors.primary
    },
    buttonText:{
        color:'white',
        fontSize:FontSizes.large,
        fontFamily:'roboto',
        textAlign:'center'
    }
})

export default CustomButton;