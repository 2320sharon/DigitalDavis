import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import Formulary from '../screens/formularyScreen/Formulary';
import SearchedFormulary from '../screens/formularyScreen/SearchedFormulary';

import Header from '../sharedComponent/Header';

const FormularyStack = createStackNavigator(
  {
    Formulary: {
      screen: Formulary,
      navigationOptions: {
        header: ({ scene, previous, navigation }) => (
          <Header title="Formulary" navigation={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#142A4F',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'semi-bold',
          fontSize: 32,
          fontFamily: 'Helvetica',
        },
      },
    },
    SearchedFormulary: {
      screen: SearchedFormulary,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'Formulary',
    headerMode: 'screen',
  }
);

export default FormularyStack;
