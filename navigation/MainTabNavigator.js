import React from 'react';
import { Platform, Icon } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import PartiesScreen from '../screens/PartiesScreen';
import AdventurersScreen from '../screens/AdventurersScreen';

const HomeStack = createStackNavigator({
  Home : {screen: HomeScreen }
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const ManagePartyStack = createStackNavigator({
  //PartyList: {screen: PartiesScreen },
  AdventurersScreen: {screen: AdventurersScreen},
});

ManagePartyStack.navigationOptions = {
  tabBarLabel: 'Parties',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-book' : 'md-book'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  ManagePartyStack,
});

