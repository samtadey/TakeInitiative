import React from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import { Button } from 'native-base';
import strings from '../constants/Strings';
import Modal from "react-native-modal";
import MonsterNpcForm from '../components/MonsterNpcForm';
import { ScrollView } from 'react-native-gesture-handler';

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
                    <ScrollView style={styles.modal_container}>
                        
                        <MonsterNpcForm/>

                        <Button light block style={styles.spacing}>
                            <Text>Add Another Monster/NPC</Text>
                        </Button>

                        <View style={styles.flexrowBottom}>
                            <Button danger style={styles.btn} onPress={() => CEMcloseModal()}>
                                <Text style={{color: 'white'}}>Close</Text>
                            </Button>
                            <Button success style={{marginLeft: 5, flex: 1}}>
                                <Text style={{color: 'white'}}>Confirm</Text>
                            </Button>
                        </View>

                    </ScrollView>
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
    flexrowBottom : {
        flexDirection: 'row',
        display: 'flex',
        marginTop: 50,
    },
    btn : {
        flex: 1,
        width: 50,
    }
  })

