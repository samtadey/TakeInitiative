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
          this.setState({AEMmodalVisible:false});
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
        updNcpA = (id, npcs) => {
            let form = this.state.npcs;
            form[id] = npcs;
            this.setState({npcs: form});
        }
        delNpcA = (id) => {
            let form = this.state.npcs;
            form.splice(id,1);
            this.setState({npcs: form});
        }
        updAdvA = (id, adv) => {
            let form = this.state.adventurers;
            form[id] = adv;
            this.setState({adventurers: form});
        }
        delAdvA = (id) => {
            let form = this.state.adventurers;
            form.splice(id, 1);
            this.setState({adventurers: form});
        }

        validateUnits = (npcs, adventurers) => {
            let i, msg = "", name = false, initiative = false;
            //alert(npcs[0].name);
            for (i = 0; i < npcs.length; i++)
            {
                npcs[i].img_key = strings.keys.monster_img;
                if (!npcs[i].name)
                    name = true;
                if (!npcs[i].initiative)
                    initiative = true;
                
            }
            for (i = 0; i < adventurers.length; i++)
            {
                if (!adventurers[i].img_key)
                    adventurers[i].img_key = strings.keys.adv_img;
                if (!adventurers[i].name)
                    name = true;
                if (!adventurers[i].initiative)
                    initiative = true;
            }

            //alert(name + " " + initiative);
            if (name)
                msg+=strings.validation_msg.name + "\n";
            if (initiative)
                msg+=strings.validation_msg.initiative + "\n";

            //alert(msg);
            return msg;   
        }

        add_unit_to_list = (npcs, adv) => {
            let msg = validateUnits(npcs, adv)
            //alert(msg);
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

        add_units = (npcs, adv) => {
            let allItems = npcs.concat(adv);
            this.props.add_units(allItems);
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
                                    updateForm={updNcpA}
                                    deleteItem={delNpcA}
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
                                        updateForm={updAdvA}
                                        deleteItem={delAdvA}
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

