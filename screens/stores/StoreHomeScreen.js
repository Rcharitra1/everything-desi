import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native'

const StoreHomeScreen = props =>{
    return(
        <View style={styles.screen}>
        <Text>Store Home Screen</Text>
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

export default StoreHomeScreen;