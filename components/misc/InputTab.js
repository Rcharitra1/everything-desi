import React from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native'
import Colors from '../../constants/Colors';
import FontSizes from '../../constants/FontSizes';

const InputTab = props =>{
    return(
        <View style={styles.outerView}>
        <Text style={styles.label}>{props.label}</Text>
        <View style={styles.innerView}>
        <TextInput style={styles.textInput} onChangeText={props.onChange} value={props.value} textContentType={props.type} keyboardType={props.keyboardType} autoCapitalize={props.autoCapitalize}/>
        </View>
        {
            props.error &&
            <Text style={styles.error}>{props.error}</Text>
        }
        </View>

        
    );
}

const styles = StyleSheet.create({
    outerView:{
        margin:10
    },
    innerView:{
        borderRadius:6,
        shadowColor:'black',
        backgroundColor:'white',
        paddingVertical:15,
        paddingHorizontal:10,
        shadowOffset:{height:3, width:0},
        elevation:6,
        shadowOpacity:0.25
    },
    label:{
        fontFamily:'roboto-bold',
        marginVertical:5,
        marginHorizontal:10,
        fontSize:FontSizes.large
    },
    textInput:{
        fontSize:FontSizes.medium
    },
    error:{
        fontSize:FontSizes.small,
        fontFamily:'roboto',
        color:Colors.error,
        marginVertical:5,
        marginHorizontal:10
    }
})

export default InputTab;