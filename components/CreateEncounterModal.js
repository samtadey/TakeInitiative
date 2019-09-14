import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    AsyncStorage, 
} from 'react-native';
import { Button } from 'native-base';
import strings from '../constants/Strings';
import Modal from "react-native-modal";
import PcNpcForm from '../components/PcNpcForm';
import MonsterNpcForm from '../components/MonsterNpcForm';
import { ScrollView } from 'react-native-gesture-handler';
import NPC from '../classes/NPC';


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
          this.setState({CEMmodalVisible:false});
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
        updNpc = (id, npc) => {
            let form = this.state.npcs;
            form[id] = npc;
            this.setState({npcs: form});
        }
        delNpc = (id) => {
            let form = this.state.npcs;
            form.splice(id,1);
            this.setState({npcs: form});
        }
        updAdv = (id, adv) => {
            let form = this.state.adventurers;
            form[id] = adv;
            this.setState({adventurers: form});
        }
        delAdv = (id) => {
            let form = this.state.adventurers;
            form.splice(id, 1);
            this.setState({adventurers: form});
        }
        //validate and set default images
        validateEncounter = (npcs, adventurers) => {
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
        generateEncounter = () => {
            //this.setState({msg: null});
            let msg = validateEncounter(this.state.npcs, this.state.adventurers)
            //alert(msg);
            if (!msg) //no msg
            {
                let allItems = this.state.npcs.concat(this.state.adventurers);
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
                    <ScrollView style={styles.modal_container}>

                        <Text style={styles.title}>{strings.drawer.initDrawerCreate}</Text>

                        <Text style={styles.formtitle}>{strings.create_encounter_form.monsters}</Text>

                        {this.state.npcs.map(function(listitem, index){
                            return(
                                <MonsterNpcForm
                                    key={index}
                                    id={index}
                                    monster={listitem}
                                    updateForm={updNpc}
                                    deleteItem={delNpc}
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
                                    updateForm={updAdv}
                                    deleteItem={delAdv}
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
                            <Button success block style={styles.btn} onPress={() => generateEncounter()}>
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

