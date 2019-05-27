import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Button, Text } from 'native-base';
import AdventuringParty from '../components/AdventuringParty';

let parties = [
    {party_name: "Crazy Party", gm_name: 'Sam', start_date: '2018', image: require("../assets/party_icons/cyclone.png")},
    {party_name: "Company of the Risen", gm_name:'Quinn', start_date: '2017', image: require("../assets/party_icons/howling_wolf.png")},
    {party_name: "Noname", gm_name: 'Nathan', start_date: '2016', image: require("../assets/party_icons/wierd_ball.png")},
  ];

export default class AdventuringPartiesScreen extends React.Component {
  static navigationOptions = {
    title: 'Adventuring Parties',
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>   
          {parties.map(function(listitem, index){
            return(
                <AdventuringParty 
                    key={index}
                    party_name={listitem.party_name}
                    gm_name={listitem.gm_name}
                    start_date={listitem.start_date}
                    image={listitem.image}
                />)
          })}
          <Button light block>
              <Text>Add Adventuring Party</Text>
          </Button>
        </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  contentContainer: {
    paddingTop: 30,
  }
});
