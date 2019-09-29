import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
} from 'react-native';
import { Button } from 'native-base';
import strings from '../constants/Strings';
import Modal from "react-native-modal";
import PcNpcForm from '../components/PcNpcForm';
import MonsterNpcForm from '../components/MonsterNpcForm';
import { ScrollView } from 'react-native-gesture-handler';
import NPC from '../classes/NPC';
import unit_forms from '../functions/unit_forms'


export default class CreateEncounterModal extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          CEMmodalVisible: false,
          npcs: [new NPC()],
          adventurers: [new NPC()],
          msg: null,
        };

        CEMopenModal = () => {
          this.setState({
            CEMmodalVisible: true,
          });
        }
        CEMcloseModal = () => {
          this.setState({CEMmodalVisible: false, msg: null});
        }

        extendFormMon = () => {
            let formM = this.state.npcs;
            formM.push(new NPC());
            this.setState({npcs: formM});
        }
        extendFormAdv = () => {
            let formA = this.state.adventurers;
            formA.push(new NPC());
            this.setState({adventurers: formA});
        }

        upd = (id, unit, state) => {
            this.setState({
                [state]: unit_forms.updateFormItem(id, unit, this.state[state])
            })
        }
        deleteItem = (id, state) => {
            this.setState({
                [state]: unit_forms.deleteFormItem(id, this.state[state])
            })
        }

        generateEncounter = (npcs, adv) => { 
            let msg = unit_forms.validateForm(npcs, adv)
            //alert(msg);
            if (!msg) //no msg
            {
                let allItems = npcs.concat(adv);
                allItems.sort(compare);

                this.props.generate_list(allItems);
                this.setState({npcs: [new NPC()], adventurers: [new NPC()]});
                CEMcloseModal();
            }
            else 
            {
                this.setState({msg: msg});
            }
        }

        compare = (a, b) => {
            let aInt = parseInt(a.initiative,10);
            let bInt = parseInt(b.initiative,10);
            if (aInt < bInt)
                return 1;
            else if (aInt > bInt)
                return -1;
            return 0;
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <Modal
                visible={this.state.CEMmodalVisible}
                animationType={'slide'}
                onBackdropPress={() => CEMcloseModal()}>
                    <View>
                    <ScrollView style={styles.modal_container}>

                        <Text style={styles.title}>{strings.drawer.initDrawerCreate}</Text>

                        <Text style={styles.formtitle}>{strings.create_encounter_form.monsters}</Text>

                        {this.state.npcs.map(function(listitem, index) {
                            return(
                                <MonsterNpcForm
                                    key={index}
                                    id={index}
                                    monster={listitem}
                                    updt={upd}
                                    del={deleteItem}
                                />
                            )
                        })}

                        <Text style={styles.formtitle}>{strings.create_encounter_form.adventurers}</Text>

                        {this.state.adventurers.map(function(listitem, index){
                            return(
                                <PcNpcForm
                                    key={index}
                                    id={index}
                                    npc={listitem}
                                    updt={upd}
                                    del={deleteItem}
                                />
                            )
                        })}

                        <View style={styles.flexbut}>
                            <Button light block style={styles.btn} onPress={() => extendFormMon()}>
                                <Text>{strings.create_encounter_form.addMonster}</Text>
                            </Button>
                            <Button light block style={styles.btn} onPress={() => extendFormAdv()}>
                                <Text>{strings.create_encounter_form.addAdventurer}</Text>
                            </Button>
                        </View> 

                        <View style={styles.validation_text}>
                            <Text style={styles.danger}>{this.state.msg}</Text>
                        </View>

                        <View style={styles.flexrowBottom}>
                            <Button danger block style={styles.btn} onPress={() => CEMcloseModal()}>
                                <Text style={{color:'white'}}>Close</Text>
                            </Button>
                            <Button success block style={styles.btn} onPress={() => generateEncounter(this.state.npcs, this.state.adventurers)}>
                                <Text style={{color:'white'}}>Confirm</Text>
                            </Button>
                        </View>

                    </ScrollView>
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
    test_container : {
        height:100,
    },
    modal_container: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 1,
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
    formtitle: {
        fontWeight : 'bold',
        fontSize : 18,
        marginBottom : 5,
    },
    title : {
        fontWeight : 'bold',
        fontSize : 24,
        marginBottom : 10,
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
        marginBottom: 20,
    },
    btn : {
        flex: 1,
    }
  })

