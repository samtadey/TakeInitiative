import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
} from 'react-native';
import Modal from "react-native-modal";
import ModalSelector from 'react-native-modal-selector';
import { Item, Label, Input, Button}  from 'native-base';
//import { ScrollView } from 'react-native-gesture-handler';
import Adventurer from '../components/Adventurer';
import dnddata from '../constants/dnddata'

let adventurers = [
    {name: "Balasar", adv_class: "Paladin", race: "Dragonborn", image: require("../assets/character_icons/male_paladin.png")},
    {name: "Azrael", adv_class: "Cleric", race: "Aasimar", image: require("../assets/character_icons/male_cleric.png")},
    {name: "Sly", adv_class: "Rogue", race: "Human", image: require("../assets/character_icons/female_rogue.png")},
    {name: "Orsik", adv_class: "Barbarian", race: "Dwarf", image: require("../assets/character_icons/male_barbarian.png")}
];

export default class AdventurersScreen extends React.Component {
  static navigationOptions = {
    title: 'Party here',
  };

  constructor(props){
    super(props);
    this.state = {
      modalVisible: false,
      name: null,
      adv_class: null,
      race: null,
    };
    openModal = (name, adv_class, race) => {
      this.setState({
        name: name,
        adv_class: adv_class,
        race: race,
        modalVisible: true
      });
    }
    closeModal = () => {
      this.setState({modalVisible:false});
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {/* Add/Edit adventurer modal */}
        <Modal
              visible={this.state.modalVisible}
              animationType={'slide'}
              onBackdropPress={() => closeModal()}
        >
        <View style={styles.modal_container}>

          <Text style={styles.title}>Add/Edit Adventurer</Text>

          <Item floatingLabel style={styles.spacer}>
            <Label>Name</Label>
            <Input
            name="Name"
            type="text"
            value={this.state.name}
            onChangeText={(text) => this.setState({name: text})}
            />
          </Item>

          <ModalSelector
            data={dnddata.classes}
            style={styles.spacer}
            initValue={this.state.adv_class == null ? "Choose Class" : this.state.adv_class}
            onChange={(option)=>{ this.setState({adv_class: option.label}) }} />

          <ModalSelector
            data={dnddata.races}
            style={styles.spacer}
            initValue={this.state.adv_class == null ? "Choose Race" : this.state.race}
            onChange={(option)=>{ this.setState({race: option.label}) }} />

          <Button success block onPress={() => closeModal()} style={styles.add_button}>
            <Text style={{color: 'white'}}>Confirm</Text>
          </Button>
        </View>
        </Modal>

        {/* Listview of the adventurers */}
        <ScrollView>    
          {adventurers.map(function(listitem, index){
            return(
                <Adventurer 
                    key={index}
                    image={listitem.image}
                    name={listitem.name} 
                    adv_class={listitem.adv_class}
                    race={listitem.race}
                    editAdv={openModal}
                />)
          })}
          <Button light block onPress={() => openModal(null, null, null)} style={styles.add_button}>
              <Text>Add Adventurer</Text>
          </Button>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  modal_container: {
    backgroundColor: '#FFFFFF',
    //height: ,
    padding: 10,
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
},
  innerContainer: {
    alignItems: 'center',
  },
  add_button: {
    borderRadius: 5,
  },
  formInput:{
    borderColor:'#CAECE4',
    height: 60,       
  },
  title: {
    fontSize: 18, 
    fontWeight: 'bold',
    marginBottom: 10,
  },
  spacer: {
    marginBottom: 10,
  }
})

