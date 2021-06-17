import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FontSizes from '../../constants/FontSizes';

const DisabledButton = props =>{
    return(
        <View style={{...styles.disabledView, ...props.style}}><Text style={styles.disabledText}>{props.children}</Text></View>
    );
}

const styles = StyleSheet.create({
    disabledView:{
        borderRadius:6,
        padding: 10,
        backgroundColor:'grey',
        marginVertical:10,
        shadowColor:'grey',
        shadowOffset:{height:3, width:0},
        shadowOpacity:0.5,
        elevation:6,
        shadowRadius:6

    },
    disabledText:{
        color:'white',
        fontSize:FontSizes.large,
        fontFamily:'roboto'
    }
})

export default DisabledButton;