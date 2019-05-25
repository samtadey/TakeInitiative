import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { Button}  from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import Adventurer from '../components/Adventurer';

let adventurers = [
    {name: "Balasar", adv_class: "Paladin", race: "Dragonborn", image: require("../assets/character_icons/male_paladin.png")},
    {name: "Azrael", adv_class: "Cleric", race: "Assimar", image: require("../assets/character_icons/male_cleric.png")},
    {name: "Sly", adv_class: "Rogue", race: "Human", image: require("../assets/character_icons/female_rogue.png")},
    {name: "Orsik", adv_class: "Barbarian", race: "Dwarf", image: require("../assets/character_icons/male_barbarian.png")}
];

export default class AdventurersScreen extends React.Component {
  static navigationOptions = {
    title: 'Party here',
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>    
          {adventurers.map(function(listitem, index){
            return(
                <Adventurer 
                    key={index}
                    image={listitem.image}
                    name={listitem.name} 
                    adv_class={listitem.adv_class}
                    race={listitem.race}
                />)
          })}
          <Button block light style={styles.add_button}>
            <Text>Add Adventurer</Text>
          </Button>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  add_button: {
    borderRadius: 5,
  }
})

