import React, {useState, useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import {  MainNavigator, AuthNavigator  } from './ShopNavigator';
import * as authActions from '../store/actions/auth';





const AppNavigator = props =>{

    const [userLoggedIn, setUserLoggedIn]=useState(false);
    const isAuthenticated= useSelector(state=> state.user.isAuthenticated);
    const dispatch = useDispatch();




    useEffect(() => {

        dispatch(authActions.autoLogin())
        
        if(isAuthenticated)
        {
            setUserLoggedIn(true)
        }else
        {
            setUserLoggedIn(false)
        }
    }, [isAuthenticated, userLoggedIn])

    // console.log(userLoggedIn)

    return(
        <NavigationContainer>
        {
            userLoggedIn ?<MainNavigator/>:
            <AuthNavigator/>
        }
        </NavigationContainer>
    );
}

export default AppNavigator;