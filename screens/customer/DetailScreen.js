import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native'

const DetailScreen = props =>{
    return(
        <View style={styles.screen}>
        <Text>Detail Screen</Text>
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

export default DetailScreen;