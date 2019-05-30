import React from 'react';
import { Platform, Icon } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import InitiativeScreen from '../screens/InitiativeScreen';
import AdventuringPartiesScreen from '../screens/AdventuringPartiesScreen';
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
  AdventuringPartiesScreen: {screen: AdventuringPartiesScreen },
  AdventurersScreen: {screen: AdventurersScreen},
});

ManagePartyStack.navigationOptions = {
  tabBarLabel: 'Parties',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-beer' : 'md-beer'}
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

