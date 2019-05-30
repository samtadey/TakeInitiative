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

var party = [
  {name: "Sam", player_class: "Paladin", initiative: 25},
  {name: "Ted", player_class: "Rogue", initiative: 24},
  {name: "Fred", player_class: "Ranger", initiative: 2}
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
    }
    openDrawer = () => {
      this.setState({drawer_open: true});
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
        content={<InitiativeActionsDrawer/>}
        tapToClose={true}
        open={this.state.drawer_open}
        openDrawerOffset={0.2} // 20% gap on the right side of drawer
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        styles={drawerStyles}
        tweenHandler={(ratio) => ({
          main: { opacity:(2-ratio)/2 }
        })}>
          <ScrollView style={styles.container}>    

            <View style={styles.container}>
              <Text>Hello Werld</Text>
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
  },
});
