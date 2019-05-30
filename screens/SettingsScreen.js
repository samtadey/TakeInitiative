import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';

export default class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Settings",
  })

  render() {
    return (
      <View>
        <Text>Hi Warld</Text>
      </View>
    );
  }
}

