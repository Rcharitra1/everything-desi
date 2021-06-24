import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import {  MainNavigator, AuthNavigator  } from './ShopNavigator';




const AppNavigator = props =>{
    return(
        <NavigationContainer>
        <AuthNavigator/>
        </NavigationContainer>
    );
}

export default AppNavigator;