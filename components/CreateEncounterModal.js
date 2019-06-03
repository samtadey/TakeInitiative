import React from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import { Button } from 'native-base';
import strings from '../constants/Strings';
import Modal from "react-native-modal";
import MonsterNpcForm from '../components/MonsterNpcForm';
import { ScrollView } from 'react-native-gesture-handler';
import NPC from '../classes/NPC';

export default class CreateEncounterModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          CEMmodalVisible: false,
          npcs: [new NPC()],
        };
        CEMopenModal = () => {
          this.setState({
            CEMmodalVisible: true
          });
        }
        CEMcloseModal = () => {
          this.setState({CEMmodalVisible:false});
        }
        extendForm = () => {
            let form = this.state.npcs;
            form.push(new NPC());
            this.setState({npcs: form});
        }
        updNpc = (id, npc) => {
            let form = this.state.npcs;
            form[id] = npc;
            this.setState({npcs: form});
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

                        {this.state.npcs.map(function(listitem, index){
                            return(
                                <MonsterNpcForm
                                    key={index}
                                    id={index}
                                    updateForm={updNpc}
                                />
                            )
                        })}

                        <Button light block style={styles.spacing} onPress={() => extendForm()}>
                            <Text>Add Another Monster/NPC</Text>
                        </Button>

                        <View style={styles.flexrowBottom}>
                            <Button danger block style={styles.btn} onPress={() => CEMcloseModal()}>
                                <Text style={{color:'white'}}>Close</Text>
                            </Button>
                            <Button success block style={styles.btn}>
                                <Text style={{color:'white'}}>Confirm</Text>
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
        marginTop: 100,
    },
    btn : {
        flex: 1,
    }
  })

