import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Icon, Button } from 'native-base';
import Drawer from 'react-native-drawer'
import { TouchableOpacity } from 'react-native-gesture-handler';
import InitiativeActionsDrawer from '../components/InitiativeActionsDrawer';
import InitiativeItem from '../components/InitiativeItem';

let party = [
  // {name: "Sam", adv_class: "Paladin", initiative: 25},
  // {name: "Ted", adv_class: "Rogue", initiative: 24},
  // {name: "Fred", adv_class: "Ranger", initiative: 2}
];

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

    generate_list = (list) => {
      this.setState({initiative_list: list});
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

    add_unit = (npc) => {
      let list = this.state.initiative_list;
      let first, second;
      let toAdd = parseInt(npc.initiative, 10);

      if (list.length === 0)
      {
        list.push(npc);
        //this.setState({initiative_list: list});
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

          //if (i != list.length - 1)
            second = parseInt(list[i + 1].initiative, 10);
          // else 
          //   second = parseInt(list[0].initiative, 10);
        
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
  }

  render() {

    const drawerStyles = {
      drawer: { padding: 5, backgroundColor: '#FFFFFF', shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
      main: {paddingLeft: 3},
    }

    return (
      <Drawer
        type="overlay"
        content={<InitiativeActionsDrawer generate_list={generate_list} advance_list={advance_list} add_unit={add_unit} clear_list={clear_list}/>}
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
