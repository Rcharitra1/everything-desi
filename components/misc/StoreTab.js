import React from 'react';
import { TouchableNativeFeedback, StyleSheet, View, Image, Text, TouchableOpacity, Platform } from 'react-native'
import CustomButton from '../ui/CustomButton';
import Colors from '../../constants/Colors';
import FontSizes from '../../constants/FontSizes';

const StoreTab = props =>{
    let TouchUI = TouchableOpacity;
    if(Platform.OS==='android' && Platform.Versio>=21){
        TouchUI = TouchableNativeFeedback
    }
    return(
        <TouchUI activeOpacity={0.25} onPress={props.onPress}>
    
        <View style={styles.tabView}>
        <Image source={{uri:props.imageUrl}} style={styles.tabImage}/>
        <Text style={styles.tabText}>{props.title}</Text>
        <CustomButton onPress={props.onPress}>Shop</CustomButton>
        </View>
        </TouchUI>
    )
}

const styles = StyleSheet.create({
    tabView :{
        height: 300,
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
    tabImage:{
        width:'100%', 
        height:'75%',
        borderTopLeftRadius:6,
        borderTopRightRadius:6
    },
    tabText:{
        textAlign:'center',
        fontSize:FontSizes.medium,
        fontFamily:'roboto-bold',
        color:Colors.dark
    },
    
})

export default StoreTab;