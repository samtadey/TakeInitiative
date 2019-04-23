import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default class AddEditPartyScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: "Add/Edit Party",
  })

  state = {
    name: '',
    numAdv: 0
  }

  addEditParty() {

  }

  render() {
    return (
      <View style = {styles.container}>
            <TextInput style = {styles.input}
              placeholder= 'Adventuring Party Name'
              placeholderTextColor = 'black'
              onChangeText = {this.handleEmail}/>
            
            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.addEditParty(this.state.name, this.state.numAdv)
               }>
               <Text style = {styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>
         </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
     paddingTop: 23
  },
  input: {
     margin: 15,
     height: 60,
     borderColor: '#add8e6',
     borderWidth: 1,
     borderRadius: 5,
  },
  submitButton: {
     backgroundColor: '#add8e6',
     padding: 10,
     margin: 15,
     height: 60,
     borderRadius: 5,
  },
  submitButtonText:{
     color: 'black'
  }
})
