import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import Modal from "react-native-modal";
import {Button}  from 'native-base';
import strings from '../constants/Strings';
import ModalSelector from 'react-native-modal-selector';


export default class RemoveAdventurerModal extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      RAMmodalvisible: false,
      adv_list: [],
      avail_remove_list: [],
      to_remove: null,
    };

    RAMopenModal = () => {
        this.setState({
          RAMmodalvisible: true,
          avail_remove_list: prepRemoveList(this.props.adventurers) //not updating when new props passed, this is soln
        });
      }

    RAMcloseModal = () => {
        this.setState({RAMmodalvisible:false});
    }

    prepRemoveList = (list) => {
        let prepped_list = [];
        for (let i = 0; i < list.length; i++)
            prepped_list.push({key: i, label: list[i].name});
        
        return prepped_list;
    }

    completeRemoveAdventurer = (name, list) => {
        this.props.removeAdventurer(name, list);
        RAMcloseModal();
    }
}

    //passing props to modals
    //looks like the modal renders when the screen first renders, and then re-renders whenever you open it
    componentDidUpdate(prevProps) {
        //alert(JSON.stringify(this.props.adventurers));
        if (this.props.adventurers !== prevProps.adventurers)
            this.setState({avail_remove_list: prepRemoveList(this.props.adventurers)});
    }

  render() {
    return (
      <View style={styles.container}>
        <Modal
              visible={this.state.RAMmodalvisible}
              animationType={'slide'}
              onBackdropPress={() => RAMcloseModal()}
        >
        <View style={styles.modal_container}>

            <Text style={styles.title}>{strings.create_encounter_form.removeAdventurer}</Text>

            <ModalSelector
            data={this.state.avail_remove_list}
            style={styles.spacer}
            initValue="Choose to Remove"
            onChange={(option)=>{ this.setState({to_remove: option.label}) }} 
            />

            <View style={styles.flexrow}>
                <Button danger block style={styles.btn} onPress={() => RAMcloseModal()}>
                    <Text style={{color:'white'}}>{strings.common_verbs.close}</Text>
                </Button>
                <Button success block style={styles.btn} onPress={() => completeRemoveAdventurer(this.state.to_remove, this.props.adventurers)}>
                    <Text style={{color:'white'}}>{strings.common_verbs.confirm}</Text>
                </Button>
            </View>


        </View>
        </Modal>

        <Button danger block onPress={() => RAMopenModal()} style={styles.btn}>
            <Text style={styles.text}>{strings.create_encounter_form.removeAdventurer}</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //backgroundColor: 'green',
  },
  text: {
      color: 'white',
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
  },
  btn : {
      flex: 1,
      marginBottom: 10
  },
})

