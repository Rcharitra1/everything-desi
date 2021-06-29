import React, {useState, useEffect, useCallback} from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator, Alert  } from 'react-native'
import {useDispatch} from 'react-redux'
import InputTab from '../../components/misc/InputTab';
import {LinearGradient} from 'expo-linear-gradient'
import Colors from '../../constants/Colors';
import CustomButton from '../../components/ui/CustomButton';
import FontSizes from '../../constants/FontSizes';
import {emailPattern, phonePattern} from '../../validations/masterValidator'
import * as authActions from '../../store/actions/auth'
import { ROLE_CUSTOMER, ROLE_ADMIN } from '../../constants/Roles';
//djiasdjiaewdeajwidj

const AuthScreen = props =>{

    const [isLogin, setIsLogin]=useState(true);
    const [name, setName] = useState('');
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [address, setAddress]=useState('');
    const [phone, setPhone]=useState('');
    const [isLoading, setIsLoading]=useState(false);
    const [error, setError]=useState({})
   


    const dispatch = useDispatch();



    useEffect(() => {
        props.navigation.setOptions({
            headerTitle: isLogin ? 'Login':'Register'
        })
    }, [setIsLogin, isLogin])


    const submitClick= useCallback(async()=>{
        setIsLoading(true);

        setError({})
        let errorContainer={}
        
        // let action = ''
        if(isLogin)
        {


            dispatch(authActions.loginUser(email.toLowerCase(), password)).then((res)=>{
                setIsLoading(false)

            }).catch((err)=> {
         
                // console.log('IM here')
                let errString = err.toString().toLowerCase()

                if(errString.includes('password'))
                {
                    errString = errString.split(':')[1].replaceAll('_', ' ')

                    errorContainer.password=errString;
                }

                if(errString.includes('email'))
                {
                    errString = errString.split(':')[1].replaceAll('_', ' ')
                    errorContainer.email=errString;
                }

                setIsLoading(false);
                
            }
                )
        }else
        {
            dispatch(authActions.createUser(email.toLowerCase(), password, address, phone, name, ROLE_CUSTOMER)).then(()=>{
                console.log('im here')
                setIsLoading(false);
                setIsLogin(true);
                Alert.alert('Account Created',`Welcome ${name}, pls sign in with email and password`,[{text:'Okay'}] )
            }).catch((err)=> {
                setIsLoading(false)
                let errorStroing= err.toString().toLowerCase();
                if(errorStroing.includes('email'))
                {
                    errorStroing= errorStroing.split(':')[1].replaceAll('_', ' ');

                    errorContainer.email = errorStroing;
                }

                setIsLoading(false)
            })
        }

        if(Object.keys(errorContainer)>0)
        {
            setError(errorContainer)
        }



        

    }, [error])


    const submitForm = ()=>
    {
        setError({});

        const errorContainer ={};
        if(email.trim().length===0 || password.trim().length===0)
        {
            if(email.trim().length===0)
            {
                errorContainer.email='Pls provide a valid email';
            }

            if(password.trim().length===0)
            {
                errorContainer.password='Pls provide a valid password';
            }
        }

        if(!isLogin && (address.trim().length===0 || name.trim().length===0 || phone.trim().length===0))
        {
            if(address.trim().length===0)
            {
                errorContainer.address='Pls enter a valid address';
            }
            if(phone.trim().length===0)
            {
                errorContainer.phone='Pls enter a valid phone';
            }
            if(name.trim().length===0)
            {
                errorContainer.name='Pls enter a a valid name';
            }
        }


        if(!isLogin && !phonePattern.test(phone))
        {
            errorContainer.phone='Pls provide a valid number i.e. 123-345-6789';
        }

        if(email.trim().length!==0 && !emailPattern.test(email))
        {
            errorContainer.email='Pls provide a valid email i.e. user@test.com'
        }
        if(password.trim().length!==0 && (password.trim().length<6 || password.trim().length>10) )
        {
            errorContainer.password = 'Pls enter a valid password i.e. between 6 to 10 characters length'
        }

        setError(errorContainer)
        if(Object.keys(errorContainer).length===0)
        {
            submitClick()
        }
    }

    if(isLoading)
    {
        return <View style={styles.loading}><ActivityIndicator size={'large'} color={Colors.primary}/></View>
    }


    return(


        <ScrollView>
        <View style={styles.screen}>
        <KeyboardAvoidingView behavior={Platform.OS==='android'? '':'padding'} keyboardVerticalOffset={Platform.OS==='android'?0:50}>
          
            <LinearGradient style={styles.tabView} colors={[Colors.primary, Colors.secondary]}>
            <Text style={styles.title}>{isLogin? 'Login':'Register'}</Text>
            {!isLogin && <InputTab label={'Name'} value={name} onChange={(text)=> setName(text)} error={error ? error.name : ''}/>}
            <InputTab label={'Email'} onChange={(text)=> setEmail(text)} value={email} error={error ? error.email : ''}/>
            <InputTab label={'Password'} value={password} onChange={(text)=> setPassword(text)} secureTextEntry={true}  error={error? error.password : ''} />
            {!isLogin && <InputTab label={'Address'} value={address} onChange={text=> setAddress(text)} error={error ? error.address : ''} />}
            {!isLogin && <InputTab label={'Phone'} value={phone} onChange={text=> setPhone(text)} error={error? error.phone:''} />}
            <CustomButton style={styles.button} onPress={submitForm}>{isLogin? 'Login' :'Register'}</CustomButton>
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
        margin:'10%'
    },
    button:{
        marginHorizontal:10
    },
    tabView:{
        padding:10,
        width: '100%',
        borderRadius:6
    },
    title:{
        fontFamily:'roboto-bold',
        fontSize:FontSizes.xxl,
        color:'white',
        marginHorizontal:15
    },
    loading:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})

export const screenOptions = navData =>{
    return{
        headerTitle:'Auth Screen'
    }
}

export default AuthScreen;