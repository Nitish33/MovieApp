import React from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomBarComponent} from '../src/Component';

import {MovieListing, SavedMovie} from '../src/Screen';
import R from '../src/Utility/R';

const Tab = createBottomTabNavigator();

const BottomBar = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => {
        return <BottomBarComponent navigationProps={props} />;
      }}
      tabBarOptions={{
        activeTintColor: '#0462EA',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name="Movie List"
        component={MovieListing}
        options={{
          tabBarIcon: (args) => {
            const {size, color} = args;
            return (
              <Image
                style={{width: size, height: size, tintColor: color}}
                source={R.Images.BottomBar.Movie}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Saved Movie"
        component={SavedMovie}
        options={{
          tabBarIcon: (args) => {
            const {size, color} = args;
            return (
              <Image
                style={{width: size, height: size, tintColor: color}}
                source={R.Images.BottomBar.Bookmark}
              />
            );
          },
        }}
      />
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
