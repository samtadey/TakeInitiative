import React from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import { Button } from 'native-base';
import strings from '../constants/Strings';
import Modal from "react-native-modal";
import MonsterNpcForm from '../components/MonsterNpcForm';

export default class CreateEncounterModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          CEMmodalVisible: false,
        };
        CEMopenModal = () => {
          this.setState({
            CEMmodalVisible: true
          });
        }
        CEMcloseModal = () => {
          this.setState({CEMmodalVisible:false});
        }
      }

    render() {
        return (
            <View style={styles.container}>
                <Modal
                visible={this.state.CEMmodalVisible}
                animationType={'slide'}
                onBackdropPress={() => CEMcloseModal()}>
                    <View style={styles.modal_container}>
                        
                        <MonsterNpcForm/>

                        <Button light block style={styles.add_button}>
                            <Text>Add Another Monster/NPC</Text>
                        </Button>
                    </View>
                </Modal>

                <Button success block onPress={() => CEMopenModal()} style={styles.spacing}>
                    <Text style={{color: 'white'}}>{strings.drawer.initDrawerCreate}</Text>
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    modal_container: {
      backgroundColor: '#FFFFFF',
      padding: 10,
      borderRadius: 5,
      borderColor: 'black',
      borderWidth: 1,
    },
    add_button: {
      borderRadius: 5,
      marginTop: 10,
    },
    spacing: {
        marginBottom: 10,
        borderRadius: 5,
    },
  })

