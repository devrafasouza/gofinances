import React from 'react';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins' /* importa as fontes */

import theme from './src/global/styles/theme';

import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './src/routes/app.routes';

import { Register } from './src/screens/Register';
import { Dashboard } from './src/screens/Dashboard';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  if(!fontsLoaded){
    return <AppLoading /> /* Enquanto não caregar as fontes fica em loading */
  }


  return (
    /*  */
    <ThemeProvider theme={theme}> 
      <NavigationContainer>
        <GestureHandlerRootView style={{ flex: 1}}>
          <AppRoutes />
        </GestureHandlerRootView>
      </NavigationContainer>
    </ThemeProvider>
  )
}

