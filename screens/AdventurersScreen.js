import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  AsyncStorage,
  Image,
} from 'react-native';
import Modal from "react-native-modal";
import ModalSelector from 'react-native-modal-selector';
import { Item, Label, Input, Button}  from 'native-base';
import Adventurer from '../components/Adventurer';
import dnddata from '../constants/dnddata'
import NPC from '../classes/NPC';
import strings from '../constants/Strings';
import RemoveAdventurerModal from '../components/RemoveAdventurerModal';
import ChoosePictureModal from '../components/ChoosePictureModal';

// let poss_images = [
//   {images : [
//       {id: 0, src: require('../assets/character_icons/male_wizard.png')},
//       {id: 1, src: require('../assets/character_icons/female_wizard.png')},
//       {id: 2, src: require('../assets/character_icons/male_druid.png')},
//       {id: 3, src: require('../assets/character_icons/female_druid.png')},
//   ]
//   },
//   {images : [
//       {id: 4, src:  require('../assets/character_icons/male_sorcerer.png')},
//       {id: 5, src:  require('../assets/character_icons/female_sorcerer.png')},
//       {id: 6, src:  require('../assets/character_icons/male_warlock.png')},
//       {id: 7, src:  require('../assets/character_icons/female_warlock.png')},
//   ]
//   },
//   {images : [
//         {id: 7, src:  require('../assets/character_icons/male_ranger.png')},
//         {id: 8, src:  require('../assets/character_icons/female_ranger.png')},
//         {id: 9, src:  require('../assets/character_icons/male_rogue.png')},
//         {id: 10, src:  require('../assets/character_icons/female_rogue.png')},
//     ]
//   },
//   {images : [
//         {id: 11, src:  require('../assets/character_icons/male_monk.png')},
//         {id: 12, src:  require('../assets/character_icons/female_monk.png')},
//         {id: 13, src:  require('../assets/character_icons/male_bard.png')},
//         {id: 14, src:  require('../assets/character_icons/female_bard.png')},
//     ]
//   },
//   {images : [
//         {id: 15, src:  require('../assets/character_icons/male_barbarian.png')},
//         {id: 16, src:  require('../assets/character_icons/female_barbarian.png')},
//         {id: 17, src:  require('../assets/character_icons/male_paladin.png')},
//         {id: 18, src:  require('../assets/character_icons/female_paladin.png')},
//     ]
//   },
//   {images : [
//         {id: 19, src:  require('../assets/character_icons/male_fighter.png')},
//         {id: 20, src:  require('../assets/character_icons/female_fighter.png')},
//         {id: 21, src:  require('../assets/character_icons/male_cleric.png')},
//         {id: 22, src:  require('../assets/character_icons/female_cleric.png')},
//     ]
//   },
// ]

var myMap = new Map();
// setting the values
myMap.set("male_wizard", require('../assets/character_icons/male_wizard.png'));
myMap.set("female_wizard", require('../assets/character_icons/female_wizard.png'));
myMap.set("male_druid", require('../assets/character_icons/male_druid.png'));
myMap.set("female_druid", require('../assets/character_icons/female_druid.png'));

myMap.set("male_sorcerer", require('../assets/character_icons/male_sorcerer.png'));
myMap.set("female_sorcerer", require('../assets/character_icons/female_sorcerer.png'));
myMap.set("male_warlock", require('../assets/character_icons/male_warlock.png'));
myMap.set("female_warlock", require('../assets/character_icons/female_warlock.png'));

myMap.set("male_ranger", require('../assets/character_icons/male_ranger.png'));
myMap.set("female_ranger", require('../assets/character_icons/female_ranger.png'));
myMap.set("male_rogue", require('../assets/character_icons/male_rogue.png'));
myMap.set("female_rogue", require('../assets/character_icons/female_rogue.png'));

myMap.set("male_monk", require('../assets/character_icons/male_monk.png'));
myMap.set("female_monk", require('../assets/character_icons/female_monk.png'));
myMap.set("male_bard", require('../assets/character_icons/male_bard.png'));
myMap.set("female_bard", require('../assets/character_icons/female_bard.png'));

myMap.set("male_barbarian", require('../assets/character_icons/male_barbarian.png'));
myMap.set("female_barbarian", require('../assets/character_icons/female_barbarian.png'));
myMap.set("male_paladin", require('../assets/character_icons/male_paladin.png'));
myMap.set("female_paladin", require('../assets/character_icons/female_paladin.png'));

myMap.set("male_fighter", require('../assets/character_icons/male_fighter.png'));
myMap.set("female_fighter", require('../assets/character_icons/female_fighter.png'));
myMap.set("male_cleric", require('../assets/character_icons/male_cleric.png'));
myMap.set("female_cleric", require('../assets/character_icons/female_cleric.png'));


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
      img: '',
      edit: null,
      adv_index: null,
      adventurers_list: [],
    };
    openModal = (modal_name, modal_adv_class, modal_race, img, id, edit) => {
      this.setState({
        modal_name: modal_name,
        modal_adv_class: modal_adv_class,
        modal_race: modal_race,
        edit: edit,
        adv_index: id,
        img_key: img,
        modalVisible: true
      });
    }
    closeModal = () => {
      this.setState({modalVisible:false});
    }

    load_adventurers = async () => {
      await AsyncStorage.getItem(strings.keys.adventurers)
      .then(req => JSON.parse(req))
      .then(json => json ? this.setState({adventurers_list: json}) : "")
      .catch(error => console.log('error!'));
    }

    get_image = (key) => {
      this.setState({img_key: key});
    }


    add_edit_adventurer = async (modal_name, modal_class, modal_race, img, index, edit) => {
      //alert(img);
      if (modal_name && modal_class && modal_race)
      {
        let adventurers = this.state.adventurers_list;

        if (edit === 0) //add
        {
          let npc = new NPC();
          npc.name = modal_name;
          npc.type = modal_class;
          npc.race = modal_race;
          npc.img_key = img;
          adventurers.push(npc);
        }
        else if (edit === 1) //edit
        {
          adventurers[index].name = modal_name;
          adventurers[index].type = modal_class;
          adventurers[index].race = modal_race;
          adventurers[index].img_key = img;
        }
        await AsyncStorage.setItem(strings.keys.adventurers, JSON.stringify(adventurers))
        .then(json => console.log('success!'))
        .catch(error => console.log('error!'));

        this.setState({adventurers_list: adventurers});

        closeModal();
      }
    }

    removeAdventurer = async (adventurerName, adventurer_list) => {
      //alert(adventurerName);
      if (adventurerName && adventurer_list)
      {
          let list = adventurer_list;
          for (let i = 0; i < list.length; i++)
          {
              if (list[i].name === adventurerName)
              {
                  list.splice(i,1);
                  break;
              }
          }

          await AsyncStorage.setItem(strings.keys.adventurers, JSON.stringify(list))
          .then(json => console.log('success!'))
          .catch(error => console.log('error!'));

          this.setState({adventurers_list: list});
      }
      else 
      {
          alert("Choose an Adventurer to Remove");
      }
  }

  }

  componentDidMount() {
    load_adventurers();

    // var myMap = new Map();
    // // setting the values
    // myMap.set("male_wizard", require('../assets/character_icons/male_wizard.png'));
    // myMap.set("female_wizard", require('../assets/character_icons/female_wizard.png'));
    // myMap.set("male_druid", require('../assets/character_icons/male_druid.png'));
    // myMap.set("female_druid", require('../assets/character_icons/female_druid.png'));

    // this.setState({img_list: myMap});
  }

  render() {
    return (
      <View style={styles.container}>
        {/* Add/Edit adventurer modal */}
        <Modal
              visible={this.state.modalVisible}
              animationType={'slide'}
              //onBackdropPress={() => closeModal()}
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

          <ChoosePictureModal get_image={get_image}/>

          {/* {this.state.img_row && this.state.img_cell ? <Image style={styles.photo} source={poss_images[row].images[cell].src}/> : <View/>} */}

          <View style={styles.flexrow}>
              <Button danger block style={styles.btn} onPress={() => closeModal()}>
                  <Text style={{color:'white'}}>Close</Text>
              </Button>
              <Button success block onPress={() => add_edit_adventurer(this.state.modal_name, this.state.modal_adv_class, this.state.modal_race, this.state.img_key, this.state.adv_index, this.state.edit)} style={styles.btn}>
                <Text style={{color: 'white'}}>Confirm</Text>
              </Button>
          </View>

        </View>
        </Modal>

        {/* Listview of the adventurers */}
        <ScrollView style={styles.scroll}>    
          {this.state.adventurers_list.map(function(listitem, index){
            return(
                <Adventurer 
                    key={index}
                    id={index}
                    image={myMap.get(listitem.img_key)}
                    name={listitem.name} 
                    adv_class={listitem.type}
                    race={listitem.race}
                    editAdv={openModal}
                />)
          })}
          <Button light block onPress={() => openModal(null, null, null, null, null, 0)} style={styles.btn}>
              <Text>{strings.create_encounter_form.addAdventurer}</Text>
          </Button>

          <View style={styles.removebtn}>
            <RemoveAdventurerModal removeAdventurer={removeAdventurer} adventurers={this.state.adventurers_list}/>
          </View>
        </ScrollView>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    padding: 10,
    //backgroundColor: 'red',
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
    padding: 10,
    //backgroundColor: 'green',
  },
  removebtn: {
    borderRadius: 5,
    flex: 1,
    marginTop: 20
  },
  scroll : {
    //flex: 1,
    //backgroundColor: 'red',
  },
  photo: {
    height: 75,
    width: 75,
    //backgroundColor: '#F0F0F0',
},
  modal_container: {
    //flex: 1,
    backgroundColor: '#FFFFFF',
    //backgroundColor: 'red',
    height: 350,
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

