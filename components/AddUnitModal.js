import React from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import { Button } from 'native-base';
import strings from '../constants/Strings';
import Modal from "react-native-modal";
import PcNpcForm from '../components/PcNpcForm';
import MonsterNpcForm from '../components/MonsterNpcForm';
import NPC from '../classes/NPC';
import { ScrollView } from 'react-native-gesture-handler';
import unit_forms from '../functions/unit_forms';


export default class AddUnitModal extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          AEMmodalVisible: false,
          npcs: [],
          adventurers: [],
          events: [new NPC()],
          msg: null,
        };

        AEMopenModal = () => {
          this.setState({
            AEMmodalVisible: true
          });
        }

        AEMcloseModal = () => {
          this.setState({AEMmodalVisible:false, msg: null});
        }

        extendFormMonA = () => {
            let formM = this.state.npcs;
            formM.push(new NPC());
            this.setState({npcs: formM});
        }
        extendFormAdvA = () => {
            let formA = this.state.adventurers;
            formA.push(new NPC());
            this.setState({adventurers: formA});
        }
        extendFormEventA = () => {
            let formE = this.state.events;
            formE.push(new NPC());
            this.setState({events: formE});
        }
        updA = (id, unit, state) => {
            this.setState({
                [state]: unit_forms.updateFormItem(id, unit, this.state[state])
            })
        }
        deleteItemA = (id, state) => {
            this.setState({
                [state]: unit_forms.deleteFormItem(id, this.state[state])
            })
        }

        add_unit_to_list = (npcs, adv) => {
            let msg = unit_forms.validateForm(npcs, adv)

            if (!msg) //no msg
            {
                let allItems = npcs.concat(adv);
                this.props.add_units(allItems);
                this.setState({npcs: [new NPC()], adventurers: [new NPC()]});
                AEMcloseModal();
            }
            else 
            {
                this.setState({msg: msg});
            }
        }
    }


    render() {
        return (
            <View style={styles.container}>
            
                <Modal
                visible={this.state.AEMmodalVisible}
                animationType={'slide'}
                onBackdropPress={() => AEMcloseModal()}>

                    {/* Empty view forces scrollview to only take up space it needs. */}
                    <View>
                        <ScrollView style={styles.modal_container}>

                            <Text style={styles.title}>{strings.drawer.initDrawerAdd}</Text>

                            <Text style={styles.formtitle}>{strings.create_encounter_form.monsters}</Text>

                            {this.state.npcs.map(function(listitem, index){
                            return(
                                <MonsterNpcForm
                                    key={index}
                                    id={index}
                                    monster={listitem}
                                    updt={updA}
                                    del={deleteItemA}
                                />
                                )
                            })}

                            <Text style={styles.formtitle}>{strings.create_encounter_form.adventurers}</Text>

                            {this.state.adventurers.map(function(listitem, index){
                                return(
                                    <PcNpcForm
                                        key={index}
                                        id={index}
                                        npcs={listitem}
                                        updt={updA}
                                        del={deleteItemA}
                                    />
                                )
                            })}

                            <View style={styles.flexbut}>
                                <Button light block style={styles.btn} onPress={() => extendFormMonA()}>
                                    <Text>{strings.create_encounter_form.addMonster}</Text>
                                </Button>
                                <Button light block style={styles.btn} onPress={() => extendFormAdvA()}>
                                    <Text>{strings.create_encounter_form.addAdventurer}</Text>
                                </Button>
                            </View> 

                            <View style={styles.validation_text}>
                                <Text style={styles.danger}>{this.state.msg}</Text>
                            </View>

                            <View style={styles.flexrowBottom}>
                                <Button danger block style={styles.btn} onPress={() => AEMcloseModal()}>
                                    <Text style={{color:'white'}}>Close</Text>
                                </Button>
                                <Button success block style={styles.btn} onPress={() => add_unit_to_list(this.state.npcs, this.state.adventurers)}>
                                    <Text style={{color:'white'}}>Confirm</Text>
                                </Button>
                            </View>
                        </ScrollView>
                    </View>

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
      //flex: 1,
      //backgroundColor: 'red',
    },
    danger: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'red',
    },
    validation_text: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
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
    formtitle: {
        fontWeight : 'bold',
        fontSize : 18,
        marginBottom : 5,
    },
    add_button: {
      borderRadius: 5,
      marginTop: 10,
    },
    flexbut: {
        flexDirection: 'row',
        display: 'flex',
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
        marginBottom: 20,
    },
    btn : {
        flex: 1,
    }
  })

