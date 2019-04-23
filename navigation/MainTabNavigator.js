import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import PartiesScreen from '../screens/PartiesScreen';
import AdventurersScreen from '../screens/AdventurersScreen';
import AddEditPartyScreen from '../screens/AddEditPartyScreen';
import AddEditAdventurerScreen from '../screens/AddEditAdventurerScreen';

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
  PartyList: {screen: PartiesScreen },
  AddEditParty: {screen: AddEditPartyScreen },
  AdventurerList: {screen: AdventurersScreen },
  AddEditAdventurer: {screen: AddEditAdventurerScreen },
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

