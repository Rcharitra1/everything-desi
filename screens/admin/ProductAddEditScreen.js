import React from 'react';
import { View, Text, TextInput, StyleSheet, Platform } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/ui/HeaderButton';

const ProductAddEditScreen = props =>{
    return(
        <View style={styles.screen}>
        <Text>Product Add/Edit Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    screen:{
        alignItems:'center',
        justifyContent:'center',
        flex:1
    }
})

export const screenOptions = navData =>{
    const headerTitle = navData.route.params.headerTitle;


    return{
        headerTitle:headerTitle,
        headerRight:()=>(
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item iconName={Platform.OS==='android'? 'md-save':'ios-save'} onPress={()=>{}}/>
            </HeaderButtons>
        )
    }
}
export default ProductAddEditScreen;