import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native'

const OrderScreen = props =>{
    return(
        <View style={styles.screen}>
        <Text>Order Screen</Text>
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

export default OrderScreen;