import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import { Item, Label, Input, Icon } from 'native-base';
import strings from '../constants/Strings';
import CheckBox from 'react-native-check-box'; 
import ModalSelector from 'react-native-modal-selector';
import PropTypes from 'prop-types';
import NPC from '../classes/NPC';
import monsterApi from '../api/dnd5api'

export default class MonsterNpcForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            npc: new NPC(),
            monsters: [],
        };
        this.deleteFormItem = this.deleteFormItem.bind(this);
        this.updtName = this.updtName.bind(this);
        this.updtType = this.updtType.bind(this);
        this.updtHealth = this.updtHealth.bind(this);
        this.updtInitiative = this.updtInitiative.bind(this);
        this.updtIsLeg = this.updtIsLeg.bind(this);
        this.updtLegAct = this.updtLegAct.bind(this);
        this.updtLegRes = this.updtLegRes.bind(this);

        this.loadMonsters = this.loadMonsters.bind(this);
        this.loadMonsterInfo = this.loadMonsterInfo.bind(this);
    }

    componentDidMount() {
        this.loadMonsters();
    }

    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
          this.setState({
            npc: this.props.npc
          })
        }
      }

    async loadMonsters() {
        let response = await monsterApi.getMonsters();
        response = response.data;
        let monstersRefined = [];

        for (let i = 0; i < response.count; i++)
        {
            monstersRefined.push({key: i, label: response.results[i].name, url: response.results[i].url});
        }
        this.setState({monsters: monstersRefined});
    }

    async loadMonsterInfo(url) {
        let response = await monsterApi.getMonsterInfo(url);
        response = response.data;
        //alert(JSON.stringify(response));

        this.updtName(response.name);
        this.updtType(response.type);
        this.updtHealth(response.hit_points.toString());

        // //TODO
        // if (response.legendary_actions.length > 0)
        // {
        //     this.updtIsLeg();
        //     this.updtLegAct("3");
        //     this.updtLegRes("3");
        // }
    }

    // need to write function for number input
    // ensureDigits(number) {
    //     if (isNaN(number)) {

    //     }
    //     return number;
    // }

    deleteFormItem() {
        this.props.deleteItem(this.props.id);
    }

    async updtName(text) {
        let npc = this.state.npc;
        npc.name = text;
        this.setState({npc: npc});
        this.props.updateForm(this.props.id, npc);
    }

    updtType(text) {
        let npc = this.state.npc;
        npc.type = text;
        this.setState({npc: npc});
        this.props.updateForm(this.props.id, npc);
    }

    updtHealth(text) {
        let npc = this.state.npc;
        npc.health = text;
        this.setState({npc: npc});
        this.props.updateForm(this.props.id, npc);
    }
    
    updtInitiative(text) {
        let npc = this.state.npc;
        npc.initiative = text;
        this.setState({npc: npc});
        this.props.updateForm(this.props.id, npc);
    }

    updtIsLeg() {
        let npc = this.state.npc;
        npc.legendary = !npc.legendary;
        npc.leg_actions = null;
        npc.leg_resist = null;
        this.setState({npc: npc});
        this.props.updateForm(this.props.id, npc);
    }

    updtLegAct(text) {
        let npc = this.state.npc;
        npc.leg_actions = text;
        this.setState({npc: npc});
        this.props.updateForm(this.props.id, npc);
    }

    updtLegRes(text) {
        let npc = this.state.npc;
        npc.leg_resist = text;
        this.setState({npc: npc});
        this.props.updateForm(this.props.id, npc);
    }

    render() {
        return (
            <View style={styles.container}>

                {this.props.single != 1 ?
                <View style={styles.closeIconRow}>
                     
                    <ModalSelector
                    data={this.state.monsters}
                    style={styles.modalselector}
                    initValue={strings.create_encounter_form.monsterFormName}
                    // onChange={(option)=>{ this.updtName(option.label) }} />
                    onChange={(option)=>{ this.loadMonsterInfo(option.url) }} />

                    <TouchableOpacity onPress={this.deleteFormItem} style={styles.closeIcon}>
                        <Icon name={Platform.OS === 'ios' ? 'ios-close-circle-outline' : 'md-close-circle-outline'} style={{marginRight: 10}}/>
                    </TouchableOpacity>
                </View>
                : <View/>}

                <Item floatingLabel style={styles.formItems}>
                    <Label>{strings.common_titles.name}</Label>
                    <Input
                    name={strings.common_titles.name}
                    type="text"
                    value={this.state.npc.name}
                    onChangeText={(text) => this.updtName(text)}
                    />
                </Item>

                <Item floatingLabel style={styles.formItems}>
                    <Label>{strings.common_titles.type}</Label>
                    <Input
                    name={strings.common_titles.type}
                    type="text"
                    value={this.state.npc.type}
                    onChangeText={(text) => this.updtType(text)}
                    />
                </Item>
        
                <Item floatingLabel style={styles.formItems}>
                    <Label>{strings.common_titles.health}</Label>
                    <Input
                    name={strings.common_titles.health}
                    type="number"
                    keyboardType="numeric"
                    value={this.state.npc.health}
                    onChangeText={(text) => this.updtHealth(text)}
                    />
                </Item>
                <Item floatingLabel style={styles.formItems}>
                    <Label>{strings.common_titles.initiative}</Label>
                    <Input
                    name={strings.common_titles.initiative}
                    type="number"
                    keyboardType="numeric"
                    value={this.state.npc.initiative}
                    onChangeText={(text) => this.updtInitiative(text)}
                    />
                </Item>
                
            </View>
        );
    }
}

MonsterNpcForm.propTypes = {
    id: PropTypes.number
  }
MonsterNpcForm.defaultProps = {
    id: -1
}

const styles = StyleSheet.create({
    container: {
      padding: 10,
      borderColor: 'grey',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 10,
    },
    closeIconRow: {
        flexDirection: 'row',
        display: 'flex',
        //alignItems: 'flex-end',
        //backgroundColor: 'blue'
    },
    modalselector : {
        flex: 4,
        alignItems: 'flex-start'
    },
    closeIcon: {
        flex: 1,
        alignItems: 'flex-end'
    },
    flexrow: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        marginTop: 5,
    },
    formItems: {
        marginTop: 5,
        flex: 1,
        alignItems: 'flex-start'
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
    },
    spacing: {
        marginBottom: 10,
        borderRadius: 5,
    },
    checkboxpos: {
        marginTop: 10,
        marginBottom: 10,
    },
    checkColor: {
        color: '#585858'
    },
    checktext : {
        fontSize: 17, 
        color: '#484848'
    }
  })

