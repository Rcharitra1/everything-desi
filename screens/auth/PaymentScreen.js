import React from 'react';
import { CardField, useStripe } from '@stripe/stripe-react-native';

const  PaymentScreen=(props)=> {
  const { confirmPayment } = useStripe();


  const subTotal = props.route.params.subTotal;

//   console.log(subTotal)

  return (
    <CardField
      postalCodeEnabled={true}
      placeholder={{
        number: '4242 4242 4242 4242',
      }}
      cardStyle={{
        backgroundColor: '#FFFFFF',
        textColor: '#000000',
      }}
      style={{
        width: '100%',
        height: 50,
        marginVertical: 30,
      }}
      onCardChange={(cardDetails) => {
        console.log('cardDetails', cardDetails);
      }}
      onFocus={(focusedField) => {
        console.log('focusField', focusedField);
      }}
    />
  );
}

export const screenOptions = (navData)=>{

    return{
        headerTitle:'Payment'
    }
}

export default PaymentScreen;