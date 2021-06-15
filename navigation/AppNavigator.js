import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import { StoreNavigator, MainNavigator } from './ShopNavigator';

const AppNavigator = props =>{
    return(
        <NavigationContainer>
        <MainNavigator/>
        </NavigationContainer>
    );
}

export default AppNavigator;