import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {MovieListing, SavedMovie} from '../src/Screen';

const Tab = createBottomTabNavigator();

const BottomBar = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Movie List" component={MovieListing} />
      <Tab.Screen name="Saved Movie" component={SavedMovie} />
    </Tab.Navigator>
  );
};

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <BottomBar />
    </NavigationContainer>
  );
};

export default RootNavigator;
