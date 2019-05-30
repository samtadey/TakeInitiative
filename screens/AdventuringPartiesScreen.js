import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Item, Label, Input, Button, Text, DatePicker } from 'native-base';
import Modal from "react-native-modal";
import AdventuringParty from '../components/AdventuringParty';

let parties = [
    {party_name: "Crazy Party", gm_name: 'Sam', start_date: '123456', image: require("../assets/party_icons/cyclone.png")},
    {party_name: "Company of the Risen", gm_name:'Quinn', start_date: '123456', image: require("../assets/party_icons/howling_wolf.png")},
    {party_name: "Noname", gm_name: 'Nathan', start_date: '123456', image: require("../assets/party_icons/wierd_ball.png")},
  ];

export default class AdventuringPartiesScreen extends React.Component {
  static navigationOptions = {
    title: 'Adventuring Parties',
  };

  constructor(props) {
    super(props);
    this.state = {
      party_name: null,
      gm_name: null, //currently selected party on edit
      date: null,
      isAdd: true,
      aePartyModalVisible: false,
    }
    aePartyopenModal = (party_name, gm_name, date) => {
      let isAdd = !party_name ? true : false;
      this.setState({
        party_name: party_name,
        gm_name: gm_name, //currently selected party on edit
        date: date,
        isAdd : isAdd,
        aePartyModalVisible: true
      });
    }
    aePartycloseModal = () => {
      this.setState({aePartyModalVisible:false});
    }
    setDate = (newDate) => {
      this.setState({ date: newDate });
    }
  }

  render() {
    return (
      <View style={styles.container}>

        {/* Add/Edit Adventuring Party modal */}
        <Modal
              visible={this.state.aePartyModalVisible}
              animationType={'slide'}
              onBackdropPress={() => aePartycloseModal()}
        >
        <View style={styles.modal_container}>

          <Text style={styles.title}>Add/Edit Adventuring Party</Text>

          <Item floatingLabel style={styles.spacer}>
            <Label>Party Name</Label>
            <Input
            name="Party Name"
            type="text"
            value={this.state.party_name}
            onChangeText={(text) => this.setState({party_name: text})}
            />
          </Item>

          <Item floatingLabel style={styles.spacer}>
            <Label>GM Name</Label>
            <Input
            name="GM Name"
            type="text"
            value={this.state.gm_name}
            onChangeText={(text) => this.setState({party_name: text})}
            />
          </Item>

          <View style={styles.flexrow}>
            <Text style={styles.spacer}>Start Date: </Text>
            {this.state.isAdd ? 
            <DatePicker
              value={this.state.date}
              defaultDate={new Date()}
              minimumDate={new Date(1970, 1, 1)}
              maximumDate={new Date()}
              locale={"en"}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              placeHolderText="Select date"
              //textStyle={{ color: "green" }}
              placeHolderTextStyle={{ color: "#d3d3d3" }}
              onDateChange={setDate}
              disabled={false}
              style={styles.spacer}
            /> :
            <Text style={styles.spacer}>{this.state.date.toString().substr(4, 12)}</Text>
            }
          </View>
          
          <Button success block onPress={() => aePartycloseModal()} style={styles.add_button}>
            <Text style={{color: 'white'}}>Confirm</Text>
          </Button>
        </View>
        </Modal>

        {/* Listview of Adventuring Parties */}
        <ScrollView>   
          {parties.map(function(listitem, index){
            return(
                <AdventuringParty 
                    key={index}
                    party_name={listitem.party_name}
                    gm_name={listitem.gm_name}
                    start_date={listitem.start_date}
                    image={listitem.image}
                    editParty={aePartyopenModal}
                />)
          })}
          {/* onpress format prevents infinite setstate */}
          <Button light block onPress={() => aePartyopenModal(null, null, null)}>
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
  flexrow: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontSize: 18, 
    fontWeight: 'bold',
    marginBottom: 10,
  },
  spacer: {
    marginBottom: 10,
  }
});
