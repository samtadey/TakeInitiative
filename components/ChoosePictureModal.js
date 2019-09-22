import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import Modal from "react-native-modal";
import {Button}  from 'native-base';
import strings from '../constants/Strings';
import { ScrollView } from 'react-native-gesture-handler';



//pass the key to the adventure screen
//save the key
//the key will be used to load whatever picture is related to the character
let images = [
  {images : [
      {id: 0, src: require('../assets/character_icons/male_wizard.png'), key: "male_wizard"},
      {id: 1, src: require('../assets/character_icons/female_wizard.png'), key: "female_wizard"},
      {id: 2, src: require('../assets/character_icons/male_druid.png'), key: "male_druid"},
      {id: 3, src: require('../assets/character_icons/female_druid.png'), key: "female_druid"},
  ]
  },
  {images : [
      {id: 4, src:  require('../assets/character_icons/male_sorcerer.png'), key: "male_sorcerer"},
      {id: 5, src:  require('../assets/character_icons/female_sorcerer.png'), key: "female_sorcerer"},
      {id: 6, src:  require('../assets/character_icons/male_warlock.png'), key: "male_warlock"},
      {id: 7, src:  require('../assets/character_icons/female_warlock.png'), key: "female_warlock"},
  ]
  },
  {images : [
        {id: 7, src:  require('../assets/character_icons/male_ranger.png'), key: "male_ranger"},
        {id: 8, src:  require('../assets/character_icons/female_ranger.png'), key: "female_ranger"},
        {id: 9, src:  require('../assets/character_icons/male_rogue.png'), key: "male_rogue"},
        {id: 10, src:  require('../assets/character_icons/female_rogue.png'), key: "female_rogue"},
    ]
  },
  {images : [
        {id: 11, src:  require('../assets/character_icons/male_monk.png'), key: "male_monk"},
        {id: 12, src:  require('../assets/character_icons/female_monk.png'), key: "female_monk"},
        {id: 13, src:  require('../assets/character_icons/male_bard.png'), key: "male_bard"},
        {id: 14, src:  require('../assets/character_icons/female_bard.png'), key: "female_bard"},
    ]
  },
  {images : [
        {id: 15, src:  require('../assets/character_icons/male_barbarian.png'), key: "male_barbarian"},
        {id: 16, src:  require('../assets/character_icons/female_barbarian.png'), key: "female_barbarian"},
        {id: 17, src:  require('../assets/character_icons/male_paladin.png'), key: "male_paladin"},
        {id: 18, src:  require('../assets/character_icons/female_paladin.png'), key: "female_paladin"},
    ]
  },
  {images : [
        {id: 19, src:  require('../assets/character_icons/male_fighter.png'), key: "male_fighter"},
        {id: 20, src:  require('../assets/character_icons/female_fighter.png'), key: "female_fighter"},
        {id: 21, src:  require('../assets/character_icons/male_cleric.png'), key: "male_cleric"},
        {id: 22, src:  require('../assets/character_icons/female_cleric.png'), key: "female_cleric"},
    ]
  },
]


// let images = [
//     {row: 0,
//     images : [
//         {id: 0, src: require('../assets/character_icons/male_wizard.png'), src_raw: '../assets/character_icons/male_wizard.png'},
//         {id: 1, src: require('../assets/character_icons/female_wizard.png')},
//         {id: 2, src: require('../assets/character_icons/male_druid.png')},
//         {id: 3, src: require('../assets/character_icons/female_druid.png')},
//     ]
//     },
//     {row: 1,
//     images : [
//         {id: 10, src: require('../assets/character_icons/male_sorcerer.png')},
//         {id: 11, src: require('../assets/character_icons/female_sorcerer.png')},
//         {id: 12, src: require('../assets/character_icons/male_warlock.png')},
//         {id: 13, src: require('../assets/character_icons/female_warlock.png')},
//     ]
//     },
//     {row: 2,
//       images : [
//           {id: 100, src: require('../assets/character_icons/male_ranger.png')},
//           {id: 101, src: require('../assets/character_icons/female_ranger.png')},
//           {id: 102, src: require('../assets/character_icons/male_rogue.png')},
//           {id: 103, src: require('../assets/character_icons/female_rogue.png')},
//       ]
//     },
//     {row: 3,
//       images : [
//           {id: 1000, src: require('../assets/character_icons/male_monk.png')},
//           {id: 1001, src: require('../assets/character_icons/female_monk.png')},
//           {id: 1002, src: require('../assets/character_icons/male_bard.png')},
//           {id: 1003, src: require('../assets/character_icons/female_bard.png')},
//       ]
//     },
//     {row: 4,
//       images : [
//           {id: 10000, src: require('../assets/character_icons/male_barbarian.png')},
//           {id: 10001, src: require('../assets/character_icons/female_barbarian.png')},
//           {id: 10002, src: require('../assets/character_icons/male_paladin.png')},
//           {id: 10003, src: require('../assets/character_icons/female_paladin.png')},
//       ]
//     },
//     {row: 5,
//       images : [
//           {id: 100000, src: require('../assets/character_icons/male_fighter.png')},
//           {id: 100001, src: require('../assets/character_icons/female_fighter.png')},
//           {id: 100002, src: require('../assets/character_icons/male_cleric.png')},
//           {id: 100003, src: require('../assets/character_icons/female_cleric.png')},
//       ]
//     },
// ]

export default class ChoosePictureModal extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      img : images,
      CPMmodalvisible: false,
      selected: 10,
    };

    CPMopenModal = () => {
        this.setState({
          CPMmodalvisible: true,
        });
      }

    CPMcloseModal = () => {
        this.setState({CPMmodalvisible:false});
    }

    choose_image = (key) => {
      this.props.get_image(key);
      CPMcloseModal();
    }
 }

  componentDidMount() {
  
  }

  render() {
    return (
      <View style={styles.container2}>
        <Modal
              visible={this.state.CPMmodalvisible}
              animationType={'slide'}
              onBackdropPress={() => CPMcloseModal()}
        >
        <ScrollView style={styles.modal_container2}>

            <Text style={styles.title}>{strings.common_verbs.choose_image}</Text>

            {images.map((row, index) => 
                <View key={index} style={styles.flexrow}>
                    {images[index].images.map((listitem, index) => {
                        return (
                            <TouchableOpacity key={index} onPress={() => choose_image(listitem.key)} style={listitem.id === this.state.selected ? styles.sel : ''}>
                                <Image key={index} style={styles.photo} source={listitem.src}/>
                            </TouchableOpacity> 
                    )})
                    }
                </View>
            )}
        
            <View style={styles.flexrow}>
                <Button danger block style={styles.btn} onPress={() => CPMcloseModal()}>
                    <Text style={{color:'white'}}>{strings.common_verbs.close}</Text>
                </Button>
                {/* <Button success block style={styles.btn}>
                    <Text style={{color:'white'}}>{strings.common_verbs.confirm}</Text>
                </Button> */}
            </View>

        </ScrollView>
        </Modal>

        <Button light block onPress={() => CPMopenModal()} style={styles.b}>
            <Text>{strings.common_verbs.choose_image}</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container2: {
    //flex: 1,
    //backgroundColor: 'green',
  },
  text: {
      color: 'white',
  },
  modal_container2: {
    backgroundColor: '#FFFFFF',
    //height: ,
    padding: 10,
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
},
sel: {
    // borderRadius: 5,
    // borderColor: 'black',
    // borderWidth: 2,
    //backgroundColor : '#F0F0F0'
},
photo: {
    height: 75,
    width: 75,
    //backgroundColor: '#F0F0F0',
},
  innerContainer: {
    alignItems: 'center',
  },
  add_button: {
    borderRadius: 5,
    flex: 1,
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
  },
  flexrow : {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 10,
    height: 85,
    //backgroundColor: 'green'
  },
  btn : {
      flex: 1,
      marginBottom: 10
  },
  b : {
    marginBottom: 10,
  },
})

