import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import Colors from '../constants/Colors';
import FontSizes from '../constants/FontSizes';
import { LinearGradient } from 'expo-linear-gradient';

const StartupScreen = ()=>{
    return (
        <View style={styles.screen}>
        <LinearGradient colors={[Colors.danger, Colors.success, Colors.primary, Colors.dark]} style={styles.screen}>
        <Text style={styles.heading}>Everything Desi</Text>
        <Text style={styles.subText}>Your one store stop for <Text style={styles.highlight}>everything desi</Text></Text>
        </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    screen:{
        alignItems:'center',
        justifyContent:'center',
        flex:1,
        width:'100%'
    },
    heading:{
        fontFamily:'roboto-bold',
        color:Colors.primary,
        fontSize:34,
        marginVertical:20,
        textAlign:'center'
    },
    subText:{
        fontFamily:'roboto',
        color:Colors.secondary,
        fontSize:FontSizes.large,
        width: 200,
        textAlign:'center',
        lineHeight:25
    },
    highlight:{
        fontFamily:'roboto-bold',
        color:'white',
        fontSize:FontSizes.large 
    }

})

export default StartupScreen;