import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import {  MainNavigator, AuthNavigator  } from './ShopNavigator';





const AppNavigator = props =>{

    const [userLoggedIn, setUserLoggedIn]=useState(false);
    const user = useSelector(state=> state.user.userId);
    // const dispatch = useDispatch();
    // console.log(user);

    useEffect(() => {
        console.log(user)
        if(user!=null)
        {
            setUserLoggedIn(true)
        }
    }, [user, userLoggedIn])

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