import React from 'react';
import {Ionicons} from '@expo/vector-icons'
import {HeaderButton} from 'react-navigation-header-buttons'
import { Platform } from 'react-native'
import Colors from '../../constants/Colors'

const CustomHeaderButton = props =>{
    return <HeaderButton {...props} IconComponent={Ionicons} iconSize={23} color={Platform.OS==='android'? 'white': Colors.primary}/>
}

export default CustomHeaderButton;