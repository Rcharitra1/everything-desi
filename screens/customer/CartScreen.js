import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native'

const CartScreen = props =>{
    return(
        <View style={styles.screen}>
        <Text>Cart Screen</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    screen:{
        flex: 1,
        alignItems:'center',
        justifyContent:'center'
    }
})

export default CartScreen;