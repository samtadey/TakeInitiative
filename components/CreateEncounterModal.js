import React from 'react';
import { View, Text, StyleSheet, } from 'react-native';
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
        };

        CEMopenModal = () => {
          this.setState({
            CEMmodalVisible: true
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
        generateEncounter = () => {
            let allItems = this.state.npcs.concat(this.state.adventurers);

            allItems.sort(compare);
            // let st = '';
            // for (let i = 0; i < allItems.length; i++)
            //     st += allItems[i].name + " " + allItems[i].initiative + "\n";
            // alert(st);

            this.props.generate_list(allItems);
            this.setState({npcs: [new NPC()], adventurers: [new NPC()]});
            CEMcloseModal();
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

    // componentDidUpdate(prevState) {
    //     if (this.state.npcs.length !== prevState.npcs.length) {
    //         this.setState({npcs: this.state.npcs});
    //     }
    // }

    // componentDidMount() {
    //     this.loadMonsters();
    // }

    // async loadMonsters() {
    //     let response = await monsterApi.getMonsters();
    //     //this.setState({monsters: response.data});
    //     response = response.data;
    //     //alert("Load" + JSON.stringify(response));

    //     let monstersRefined = [];

    //     for (let i = 0; i < response.count; i++)
    //     {
    //         monstersRefined.push({key: i, label: response.results[i].name, url: response.results[i].url});
    //     }
    //     alert("Load" + JSON.stringify(monstersRefined));
    //     this.setState({monsters: monstersRefined});
    // }


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
                                    deleteItem={delNpc}
                                />
                            )
                        })}

                        {this.state.adventurers.map(function(listitem, index){
                            return(
                                <PcNpcForm
                                    key={index}
                                    id={index}
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

