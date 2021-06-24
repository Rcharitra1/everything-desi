import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform  } from 'react-native'
import {useDispatch} from 'react-redux'
import InputTab from '../../components/misc/InputTab';
import {LinearGradient} from 'expo-linear-gradient'
import Colors from '../../constants/Colors';
import CustomButton from '../../components/ui/CustomButton';
import FontSizes from '../../constants/FontSizes';
import { styleSheets } from 'min-document';


const AuthScreen = props =>{

    const [isLogin, setIsLogin]=useState(false);
    useEffect(() => {
        props.navigation.setOptions({
            headerTitle: isLogin ? 'Login':'Register'
        })
    }, [setIsLogin, isLogin])
    return(


        <ScrollView>
        <View style={styles.screen}>
        <KeyboardAvoidingView behavior={Platform.OS==='android'? '':'padding'} keyboardVerticalOffset={Platform.OS==='android'?0:50}>
          
            <LinearGradient style={styles.tabView} colors={[Colors.primary, Colors.secondary]}>
            <Text style={styles.title}>{isLogin? 'Login':'Register'}</Text>
            {!isLogin && <InputTab label={'Name'}/>}
            <InputTab label={'Email'}/>
            <InputTab label={'Password'}/>
            {!isLogin && <InputTab label={'Address'}/>}
            {!isLogin && <InputTab label={'Phone'}/>}
            <CustomButton style={styles.button}>{isLogin? 'Login' :'Register'}</CustomButton>
            <CustomButton style={{...styles.button, backgroundColor:Colors.danger}} onPress={()=> setIsLogin(!isLogin)}>{isLogin ? 'Switch To Register':'Swith To Login'}</CustomButton>
            </LinearGradient>
            </KeyboardAvoidingView>
            </View>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    screen:{
        justifyContent:'center',
        alignItems:'center',
        margin:'15%'
    },
    button:{
        marginHorizontal:10
    },
    tabView:{
        padding:10,
        width: 350,
        borderRadius:6
    },
    title:{
        fontFamily:'roboto-bold',
        fontSize:FontSizes.xxl,
        color:'white',
        marginHorizontal:15
    }
})

export const screenOptions = navData =>{
    return{
        headerTitle:'Auth Screen'
    }
}

export default AuthScreen;