import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import { StoreNavigator } from './ShopNavigator';

const AppNavigator = props =>{
    return(
        <NavigationContainer>
        <StoreNavigator/>
        </NavigationContainer>
    );
}

export default AppNavigator;