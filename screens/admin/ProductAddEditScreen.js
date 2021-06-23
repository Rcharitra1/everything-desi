import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Platform, KeyboardAvoidingView, ScrollView, Picker   } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import HeaderButton from '../../components/ui/HeaderButton';
import InputTab from '../../components/misc/InputTab'
import * as productActions from '../../store/actions/products';
import { ProductCategories } from '../../constants/Categories';
import FontSizes from '../../constants/FontSizes';

const ProductAddEditScreen = props =>{
    const storeId = props.route.params.storeId
    console.log(storeId)

    const dispatch = useDispatch();


   

   

    const categories = [];

    for(const key in ProductCategories)
    {
        categories.push(ProductCategories[key])
    }
    categories.sort()


    const [title, setTitle] = useState('')
    const [imageUrl, setImageUrl]=useState('')
    const [description, setDescription]=useState('');

    const [category, setCategory]=useState(categories[0])
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice]=useState(0.00);
    const [discount, setDiscount]=useState(0.0);

    const [error, setError]=useState({})


    const submitClick=()=>{
        setError({});
        let errorCapture = {};
        if(title.trim().length===0 || description.trim().length===0 || imageUrl.trim().length===0)
        {
               if(title.trim().length===0)
               {
                   errorCapture.title='Pls provide a valid title'
               }
              
               if(description.trim().length===0)
               {
                   errorCapture.description='Pls provide a valid description'
               }

               if(imageUrl.trim().length===0)
               {
                   errorCapture.imageUrl='Pls provide a valid image url'
               }

        }
  
       



        if(!isNaN(price) && (price>1000 || price<0))
        {
            
            errorCapture.price='Price cant be more tha $1000 or less than $0'
        }

        if(!isNaN(discount) && (discount<0.0 || discount>=1))
        {
            errorCapture.discount='Discount cant be less than 0% percent or greater than 100%, pls enter a value between 0 and 1'
        }

        if(!isNaN(quantity) && (quantity<=0 || quantity>1000))
        {
            errorCapture.quantity='Quantity cant be 0 or more than 1000'
        }
        setError(errorCapture)
        if(Object.keys(errorCapture).length===0)
        {
            console.log('success')
            submitHandler()
        }
    }

    const submitHandler = ()=>{
        dispatch(productActions.createProduct(storeId, title, category, imageUrl, description, quantity, price, discount))
    }


    useEffect(() => {
        props.navigation.setOptions({
            headerRight:()=>(
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item iconName={Platform.OS==='android'? 'md-save':'ios-save'} onPress={submitClick}/>
                </HeaderButtons>
            )
        })
    }, [submitClick, setError])
    return(
        <KeyboardAvoidingView keyboardVerticalOffset={50} behavior='padding'>
        <ScrollView>
        <InputTab label={'Title'} value={title} onChange={(text)=> setTitle(text)} error={error ? error.title : ''}/>
        <InputTab label={'ImageUrl'} value={imageUrl} onChange={(text)=>setImageUrl(text)} error={error ? error.imageUrl : ''}/>
        <InputTab label={'Description'} value={description} onChange={(text)=>setDescription(text)} error={error ? error.description:''}/>
        <InputTab label={'Quantity'} keyboardType={'number-pad'} onChange={(text)=> setQuantity(text)} value={quantity.toString()} error={error ? error.quantity:''}/>
        <InputTab label={'Price'} onChange={(text)=> setPrice(text)} value={price.toString()} error={error ? error.price : ''}/>
        <InputTab label={'Discount'} onChange={(text)=>setDiscount(text.toString())} value={discount.toString()} error={error ? error.discount : ''} keyboardType={'decimal-pad'}/>

        <View style={styles.pickerBox}>
        <Text style={styles.pickerLabel}>Category</Text>
        <Picker pickerStyle={styles.pickerStyle} onValueChange={(item)=> setCategory(item)} value={category}>
        {
            categories.map((item, index)=>{
                return <Picker.Item key={index+1} value={item} label={item} />
            })
        }
        </Picker>
        </View>
        
        </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    screen:{
        alignItems:'center',
        justifyContent:'center',
        flex:1
    },
    pickerStyle:{
        height: 100,
        width: '100%'
    },
    pickerBox:{
        marginHorizontal:10
    },
    pickerLabel:{
        fontSize:FontSizes.large,
        fontFamily:'roboto-bold',
        marginHorizontal:10
    }
})

export const screenOptions = navData =>{
    const headerTitle = navData.route.params.headerTitle;


    return{
        headerTitle:headerTitle,
       
    }
}
export default ProductAddEditScreen;