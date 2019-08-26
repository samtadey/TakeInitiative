import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  AsyncStorage,
} from 'react-native';
import Modal from "react-native-modal";
import ModalSelector from 'react-native-modal-selector';
import { Item, Label, Input, Button}  from 'native-base';
import Adventurer from '../components/Adventurer';
import dnddata from '../constants/dnddata'
import NPC from '../classes/NPC';
import strings from '../constants/Strings';
import RemoveAdventurerModal from '../components/RemoveAdventurerModal';

// let adventurers = [
//     {modal_name: "Balasar", modal_adv_class: "Paladin", modal_race: "Dragonborn", image: require("../assets/character_icons/male_paladin.png")},
//     {modal_name: "Azrael", modal_adv_class: "Cleric", modal_race: "Aasimar", image: require("../assets/character_icons/male_cleric.png")},
//     {modal_name: "Sly", modal_adv_class: "Rogue", modal_race: "Human", image: require("../assets/character_icons/female_rogue.png")},
//     {modal_name: "Orsik", modal_adv_class: "Barbarian", modal_race: "Dwarf", image: require("../assets/character_icons/male_barbarian.png")}
// ];

export default class AdventurersScreen extends React.Component {
  static navigationOptions = {
    title: 'Adventurers',
  };

  constructor(props){
    super(props);
    this.state = {
      modalVisible: false,
      modal_name: null,
      modal_adv_class: null,
      modal_race: null,
      edit: null,
      adv_index: null,
      adventurers: [],
    };
    openModal = (modal_name, modal_adv_class, modal_race, id, edit) => {
      this.setState({
        modal_name: modal_name,
        modal_adv_class: modal_adv_class,
        modal_race: modal_race,
        edit: edit,
        adv_index: id,
        modalVisible: true
      });
    }
    closeModal = () => {
      this.setState({modalVisible:false});
    }

    load_adventurers = async () => {
      await AsyncStorage.getItem(strings.keys.adventurers)
      .then(req => JSON.parse(req))
      .then(json => json ? this.setState({adventurers: json}) : "")
      .catch(error => console.log('error!'));
    }

    add_edit_adventurer = async (modal_name, modal_class, modal_race, index, edit) => {
      if (modal_name && modal_class && modal_race)
      {
        let adventurers = this.state.adventurers;

        if (edit === 0) //add
        {
          let npc = new NPC();
          npc.name = modal_name;
          npc.type = modal_class;
          npc.race = modal_race;
          adventurers.push(npc);
        }
        else if (edit === 1) //edit
        {
          adventurers[index].name = modal_name;
          adventurers[index].type = modal_class;
          adventurers[index].race = modal_race;
        }
        await AsyncStorage.setItem(strings.keys.adventurers, JSON.stringify(adventurers))
        .then(json => console.log('success!'))
        .catch(error => console.log('error!'));

        this.setState({adventurers: adventurers});

        closeModal();
      }
    }

  }

  componentDidMount() {
    load_adventurers();
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
            value={this.state.modal_name}
            onChangeText={(text) => this.setState({modal_name: text})}
            />
          </Item>

          <ModalSelector
            data={dnddata.classes}
            style={styles.spacer}
            initValue={this.state.modal_adv_class == null ? "Choose Class" : this.state.modal_adv_class}
            onChange={(option)=>{ this.setState({modal_adv_class: option.label}) }} />

          <ModalSelector
            data={dnddata.races}
            style={styles.spacer}
            initValue={this.state.modal_adv_class == null ? "Choose Race" : this.state.modal_race}
            onChange={(option)=>{ this.setState({modal_race: option.label}) }} />

            <View style={styles.flexrow}>
                <Button danger block style={styles.btn} onPress={() => closeModal()}>
                    <Text style={{color:'white'}}>Close</Text>
                </Button>
                <Button success block onPress={() => add_edit_adventurer(this.state.modal_name, this.state.modal_adv_class, this.state.modal_race, this.state.adv_index, this.state.edit)} style={styles.btn}>
                  <Text style={{color: 'white'}}>Confirm</Text>
                </Button>
            </View>
        </View>
        </Modal>

        {/* Listview of the adventurers */}
        <ScrollView>    
          {this.state.adventurers.map(function(listitem, index){
            return(
                <Adventurer 
                    key={index}
                    id={index}
                    image={listitem.image}
                    name={listitem.name} 
                    adv_class={listitem.type}
                    race={listitem.race}
                    editAdv={openModal}
                />)
          })}
          <Button light block onPress={() => openModal(null, null, null, null, 0)} style={styles.btn}>
              <Text>{strings.create_encounter_form.addAdventurer}</Text>
          </Button>
        </ScrollView>

        <View style={styles.bottom}>
          <RemoveAdventurerModal/>
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  text: {
    color: 'white'
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: 'flex-end',
    padding: 10
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
  btn: {
    borderRadius: 5,
    flex: 1,
  },
  flexrow : {
    flexDirection: 'row',
    display: 'flex',
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

