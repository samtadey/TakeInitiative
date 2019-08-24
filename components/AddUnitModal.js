import React from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import { Button } from 'native-base';
import strings from '../constants/Strings';
import Modal from "react-native-modal";
import PcNpcForm from '../components/PcNpcForm';
import MonsterNpcForm from '../components/MonsterNpcForm';
import NPC from '../classes/NPC';
import { ScrollView } from 'react-native-gesture-handler';


export default class AddUnitModal extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          AEMmodalVisible: false,
          npc: new NPC(),
        };

        AEMopenModal = () => {
          this.setState({
            AEMmodalVisible: true
          });
        }

        AEMcloseModal = () => {
          this.setState({AEMmodalVisible:false});
        }

        updUnit = (id, npc) => {
            this.setState({npc: npc});
        }

        add_unit_to_list = () => {
            this.props.add_unit(this.state.npc);
            this.setState({npc: new NPC()});
            AEMcloseModal();
        }
    }


    render() {
        return (
            <View style={styles.container}>
            
                <Modal
                visible={this.state.AEMmodalVisible}
                animationType={'slide'}
                onBackdropPress={() => AEMcloseModal()}>

                    <ScrollView style={styles.modal_container}>

                        <Text style={styles.title}>{strings.drawer.initDrawerAdd}</Text>

                        <MonsterNpcForm
                            single={1}
                            updateForm={updUnit}
                        />

                        <View style={styles.flexrowBottom}>
                            <Button danger block style={styles.btn} onPress={() => AEMcloseModal()}>
                                <Text style={{color:'white'}}>Close</Text>
                            </Button>
                            <Button success block style={styles.btn} onPress={() => add_unit_to_list()}>
                                <Text style={{color:'white'}}>Confirm</Text>
                            </Button>
                        </View>
                    </ScrollView>

                </Modal>

                <Button light block onPress={() => AEMopenModal()} style={styles.spacing}>
                    <Text>{strings.drawer.initDrawerAdd}</Text>
                </Button>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    title : {
        fontWeight : 'bold',
        fontSize : 24,
        marginBottom : 10,
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
    flexbut: {
        flexDirection: 'row',
        display: 'flex',
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

