import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Icon } from 'native-base';

var party = [
  {name: "Sam", player_class: "Paladin", initiative: 25},
  {name: "Ted", player_class: "Rogue", initiative: 24},
  {name: "Fred", player_class: "Ranger", initiative: 2}
];


export default class InitiativeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Initiative Order",
    headerLeft: (
      <Icon name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'} style={{marginLeft: 10}}></Icon>
    ),
    headerRight: (
      <Icon name={Platform.OS === 'ios' ? 'ios-hammer' : 'md-hammer'} style={{marginRight: 10}}></Icon>
    ),
  })

  render() {
    return (
      <View style={styles.container}>

        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>    

          <View style={styles.container}>
            
          </View>

          <Text>Test</Text>

        </ScrollView>

        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
