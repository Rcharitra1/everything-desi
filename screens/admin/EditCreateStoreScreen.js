import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet,ScrollView, KeyboardAvoidingView,TextInput, Platform, Switch, Picker, Alert  } from 'react-native'
import {useDispatch} from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'; 
import HeaderButton from '../../components/ui/HeaderButton'
import * as storeActions from '../../store/actions/stores';
import InputTab from '../../components/misc/InputTab';
import FontSizes from '../../constants/FontSizes';
import { StoreCategories } from '../../constants/Categories';
import { emailPattern, phonePattern, urlPattern } from '../../validations/masterValidator';
const EditCreateStoreScreen = props =>{
    let categories = [];

    for(const key in StoreCategories)
    {
        categories.push(StoreCategories[key])
    }

    const storeId = props.route.params.storeId;
    const [title, setTitle] = useState('')
    const [email, setEmail]=useState('')
    const [phone, setPhone]=useState('')
    const [type, setType]=useState(storeId? '': categories[0]);
    const [isFeatured, setIsFeatured]=useState(false);
    const [image, setImage]=useState('');
    const [address, setAddress]=useState('')
    const [error, setError]=useState({})


    const onSubmitCheck = ()=>{

        setError({})

        let errorContainer = {};
        if(title.trim().length===0 || email.trim().length===0 || phone.trim().length || image.trim().length===0 || address.trim().length===0)
        { 

            if(title.trim().length===0)
            {
                errorContainer.title='Pls enter a valid title';
            }
            if(email.trim().length===0)
            {
                errorContainer.email='Pls enter a valid email'
            }

            if(image.trim().length===0)
            {
            errorContainer.image='Pls provide a valid image'
            }

            if(address.trim().length===0)
            {
                errorContainer.address='Pls provide a valid address'
            }
            if(phone.trim().length===0)
            {
                errorContainer.phone='Pls provide a valid phone number'
            }
           
            setError(errorContainer)
            
        }

        if(email.trim().length>0 && !emailPattern.test(email))
        {
            
            errorContainer.email='Pls provide a valid email like user@test.com';
            setError(errorContainer)
        }

        if(phone.trim().length>0 && !phonePattern.test(phone))
        {
            errorContainer.phone = 'Pls provide a valid phone, like 123-345-5678'
            setError(errorContainer)
        }
        if(image.trim().length>0 && !urlPattern.test(image))
        {
            errorContainer.image='Pls provide a valid image url'
            setError(errorContainer)
        }

        if(Object.keys(errorContainer).length===0)
        {
            console.log(title)
            console.log(type)
            console.log(email)
            console.log(isFeatured)
            console.log(phone)
            console.log(image)
            console.log(address)
        }
      
    }

    const submitClick = ()=>{
        dispatch(storeActions.createStore(title, image, type, address, phone, email, isFeatured)).then(()=>{
            Alert.alert('Store Created', `${title} had been created`, [{text:'Okay'}])
        })
    }

    const dispatch = useDispatch();
    useEffect(() => {
        props.navigation.setOptions({
            headerRight:()=>(
                <HeaderButtons HeaderButtonComponent={HeaderButton}><Item iconName={Platform.OS==='android'? 'md-save':'ios-save'} onPress={onSubmitCheck}/></HeaderButtons>
            )
        })
    }, [onSubmitCheck, setError ])

    
   


    return(
        <KeyboardAvoidingView behavior={Platform.OS==='android'?'':'padding'} keyboardVerticalOffset={Platform.OS==='android'?'':50}>
        <ScrollView>
        <View style={styles.screen}>
        <InputTab onChange={(text)=> setTitle(text)} value={title} label={'Title'} error={error? error.title:''}/>
        <InputTab onChange={(text)=> setEmail(text) }value={email} label={'Email'} type={'emailAddress'} error={error? error.email:''}/>
        <InputTab onChange={(text)=> setPhone(text) }value={phone} label={'Phone'} error={error? error.phone:''}/>
        <InputTab onChange={(text)=> setImage(text)} value={image} label={'Image'} error={error? error.image:''}/>
        <InputTab onChange={(text)=> setAddress(text) }value={address} label={'Address'} error={error? error.address:''}/>
        <View style={{...styles.general, flexDirection:'row', alignItems:'center'}}>
        <Text style={styles.labelText}>Featured?</Text>
        <Switch value={isFeatured} onValueChange={()=> setIsFeatured(!isFeatured)}/>
        </View>
        <View style={styles.general}>
        <Text style={styles.labelText}>Category</Text>
        <Picker style={styles.picker} itemStyle={{fontFamily:'roboto', fontSize:FontSizes.large}} selectedValue={type} onValueChange={(itemValue)=> setType(itemValue)}>
        {
           categories.map((item, index)=>{
               return <Picker.Item key={index+1} label={item} value={item}/>
           })
        }
        </Picker>
        </View>
        


        </View>
        </ScrollView>
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    screen:{
        flex: 1,
        marginHorizontal:10,
        marginVertical:10
    },
    labelText:{
        fontFamily:'roboto-bold',
        fontSize:FontSizes.large,
        paddingRight:10

    },
    picker:{
        height: 150,
    },
    general:{
        marginHorizontal:20,
        marginTop:10 
    }
})

export const screenOptions= navData =>{
    const headerTitle = navData.route.params.headerTitle
    return{
        headerTitle:headerTitle
    }
}

export default EditCreateStoreScreen;