import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Provider} from 'react-redux'
import Thunk from 'redux-thunk';
import {createStore, applyMiddleware, combineReducers} from 'redux'
import storeReducer from './store/reducers/stores';
import productReducer from './store/reducers/products';
import AppNavigator from './navigation/AppNavigator';
import AppLoading from 'expo-app-loading';

import * as Font from 'expo-font'
const rootReducer = combineReducers({
  stores:storeReducer,
  products:productReducer
})

const store = createStore(rootReducer, applyMiddleware(Thunk));



const fetchFonts = ()=>{
  return Font.loadAsync({
    'roboto':require('./assets/fonts/RobotoCondensed-Regular.ttf'),
    'roboto-bold':require('./assets/fonts/RobotoCondensed-Bold.ttf')
  })
}

export default function App() {

  const [fontLoaded, setFontLoaded]= useState(false)

  if(!fontLoaded){
    return <AppLoading startAsync={fetchFonts} onFinish={()=> setFontLoaded(true)} onError={()=> console.log('Error loading fonts')}/>
  }
  return (
    <Provider store={store}>
    <AppNavigator/>
    </Provider>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
