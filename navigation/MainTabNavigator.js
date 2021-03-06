import React from 'react';
import { Platform, Icon } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import InitiativeScreen from '../screens/InitiativeScreen';
import AdventurersScreen from '../screens/AdventurersScreen';
import SettingsScreen from '../screens/SettingsScreen';

const HomeStack = createStackNavigator({
  Home : {screen: InitiativeScreen }
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Initiative',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios' ? `ios-clipboard` : 'md-clipboard'
      }
    />
  ),
};

const ManagePartyStack = createStackNavigator({
  AdventurersScreen: {screen: AdventurersScreen},
});

ManagePartyStack.navigationOptions = {
  tabBarLabel: 'Adventurers',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-bonfire' : 'md-bonfire'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: {screen: SettingsScreen },
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-settings' : 'md-settings'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  ManagePartyStack,
  SettingsStack,
});

