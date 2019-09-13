import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  View,
  AsyncStorage,
} from 'react-native';
import { Icon, Button } from 'native-base';
import Drawer from 'react-native-drawer'
import { TouchableOpacity } from 'react-native-gesture-handler';
import asyncstorage from '../storage/asyncstorage';
import strings from '../constants//Strings';
import InitiativeActionsDrawer from '../components/InitiativeActionsDrawer';
import InitiativeItem from '../components/InitiativeItem';

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

myMap.set("default_adventurer", require('../assets/character_icons/default_adventurer.png'));
myMap.set("default_monster", require('../assets/monster_icons/monster_icon.png'));


export default class InitiativeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Initiative Order",
    headerRight: (
      <TouchableOpacity onPress={navigation.getParam('handleDrawer')}>
        <Icon name={Platform.OS === 'ios' ? 'ios-filing' : 'md-filing'} style={{marginRight: 10}}/>
      </TouchableOpacity>
    ),
  })

  constructor(props) {
    super(props);
    this.state = {
      drawer_open: false,
      initiative_list: [],
    }

    openDrawer = () => {
      this.setState({drawer_open: true});
    }

    generate_list = async (list) => {
      this.setState({initiative_list: list});

      await AsyncStorage.setItem(strings.keys.initiative_list, JSON.stringify(list))
      .then(json => console.log('success!'))
      .catch(error => console.log('error!'));
    }

    retrieve_list = async () => {
      await AsyncStorage.getItem(strings.keys.initiative_list)
      .then(req => JSON.parse(req))
      .then(json => json ? this.setState({initiative_list: json}) : "")
      .catch(error => console.log('error!'));
    }

    clear_list = () => {
      this.setState({initiative_list: []});
    }

    advance_list = () => {
      if (this.state.initiative_list.length > 0)
      {
        let list = this.state.initiative_list;
        let advance_item = this.state.initiative_list[0];
        list.shift();
        list.push(advance_item);

        this.setState({initiative_list: list});
      }
    }

    remove_unit = (index) => {
      list = this.state.initiative_list;
      list.splice(index,1);
      this.setState({initiative_list: list});
    }

    add_unit = (npc) => {
      let list = this.state.initiative_list;
      let first, second;
      let toAdd = parseInt(npc.initiative, 10);

      if (list.length === 0)
      {
        list.push(npc);
      }
      else if (list.length === 1)
      {
        first = parseInt(list[0].initiative);
        if (toAdd < first)
          list.push(npc);
        else
          list.unshift(npc);
      }
      else
      {
        let added = 0;
        for (let i = 0; i < list.length - 1; i++)
        {
          first = parseInt(list[i].initiative, 10);
          second = parseInt(list[i + 1].initiative, 10);
        
          if (first <= second && toAdd >= second || first <= second && toAdd <= second) //toAdd is greatest or least
          {
            list.splice(i+1, 0, npc);
            added = 1;
            break;
          } 
          else if (toAdd <= first && toAdd >= second) //standard case
          {
            list.splice(i+1, 0, npc);
            added = 1;
            break;
          } 
        }
        //end of list
        if (added === 0)
          list.push(npc);
      }

      this.setState({initiative_list: list});
    }
  }

  async componentDidMount() {
    this.props.navigation.setParams({ 
        handleDrawer: openDrawer,
    });
    retrieve_list();
  }

  async componentWillUnmount() {
    //alert("Test");
    await AsyncStorage.setItem(strings.keys.initiative_list, JSON.stringify(this.state.initiative_list))
      .then(json => console.log('success!'))
      .catch(error => console.log('error!'));
  }

  render() {

    const drawerStyles = {
      drawer: { padding: 5, backgroundColor: '#FFFFFF', shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
      main: {paddingLeft: 3},
    }

    return (
      <Drawer
        type="overlay"
        content={<InitiativeActionsDrawer list={this.state.initiative_list} generate_list={generate_list} advance_list={advance_list} add_unit={add_unit} remove_unit={remove_unit} clear_list={clear_list}/>}
        tapToClose={true}
        open={this.state.drawer_open}
        openDrawerOffset={0.2} // 20% gap on the right side of drawer
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        styles={drawerStyles}
        tweenHandler={(ratio) => ({
          main: { opacity:(2-ratio)/2 }
        })}>
          <ScrollView>    

            <View style={styles.container}>

              {this.state.initiative_list.map(function(listitem, index){
                return(
                <InitiativeItem 
                    key={index}
                    name={listitem.name} 
                    adv_class={listitem.type}
                    race={listitem.race}
                    image={myMap.get(listitem.img_key)}
                    initiative={listitem.initiative}
                />)
              })}

            </View>

          </ScrollView>
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
});
