import React, {useState, useEffect, useCallback} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import {  MainNavigator, AuthNavigator  } from './ShopNavigator';
import * as authActions from '../store/actions/auth';
import StartupScreen from '../screens/StartupScreen';





const AppNavigator = props =>{

    // const [userLoggedIn, setUserLoggedIn]=useState(true);
    const isAuthenticated= useSelector(state=> !!state.user.token);
    const isTryAutoLogin= useSelector(state => state.user.tryAutoLogin)
    const dispatch = useDispatch();

 




    useEffect(() => {

        // setLoading(true)
        dispatch(authActions.autoLogin())
        
        // if(isAuthenticated)
        // {
        //     setUserLoggedIn(true)
        // }else
        // {
        //     setUserLoggedIn(false)
        // }
    }, [isAuthenticated])


    return(
        <NavigationContainer>
        
                {!isTryAutoLogin && !isAuthenticated && <StartupScreen/>}
                {isAuthenticated && <MainNavigator/>}
                {!isAuthenticated && isTryAutoLogin && <AuthNavigator/>}
            
 
        </NavigationContainer>
    );
}

export default AppNavigator;