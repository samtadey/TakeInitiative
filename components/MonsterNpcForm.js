import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import { Item, Label, Input, Icon } from 'native-base';
import strings from '../constants/Strings';
import CheckBox from 'react-native-check-box'; 
import PropTypes from 'prop-types';
import NPC from '../classes/NPC';

export default class MonsterNpcForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: this.props.id,
            npc: new NPC(),
        };
        this.deleteFormItem = this.deleteFormItem.bind(this);
        this.updtName = this.updtName.bind(this);
        this.updtType = this.updtType.bind(this);
        this.updtHealth = this.updtHealth.bind(this);
        this.updtIsLeg = this.updtIsLeg.bind(this);
        this.updtLegAct = this.updtLegAct.bind(this);
        this.updtLegRes = this.updtLegRes.bind(this);
    }

    // need to write function for number input
    ensureDigits(number) {
        if (isNaN(number)) {

        }
        return number;
    }

    deleteFormItem() {
        //let npc = this.state.npc;
        this.props.deleteItem(this.state.id);
    }

    updtName(text) {
        let npc = this.state.npc;
        npc.name = text;
        this.setState({npc: npc});
        this.props.updateForm(this.state.id, npc);
    }

    updtType(text) {
        let npc = this.state.npc;
        npc.type = text;
        this.setState({npc: npc});
        this.props.updateForm(this.state.id, npc);
    }

    updtHealth(text) {
        let npc = this.state.npc;
        npc.health = text;
        this.setState({npc: npc});
        this.props.updateForm(this.state.id, npc);
    }
    
    updtInitiative(text) {
        let npc = this.state.npc;
        npc.initiative = text;
        this.setState({npc: npc});
        this.props.updateForm(this.state.id, npc);
    }

    updtIsLeg() {
        let npc = this.state.npc;
        npc.legendary = !npc.legendary;
        npc.leg_actions = null;
        npc.leg_resist = null;
        this.setState({npc: npc});
        this.props.updateForm(this.state.id, npc);
    }

    updtLegAct(text) {
        let npc = this.state.npc;
        npc.leg_actions = text;
        this.setState({npc: npc});
        this.props.updateForm(this.state.id, npc);
    }

    updtLegRes(text) {
        let npc = this.state.npc;
        npc.leg_resist = text;
        this.setState({npc: npc});
        this.props.updateForm(this.state.id, npc);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.closeIconRow}>
                    <TouchableOpacity onPress={this.deleteFormItem} style={styles.closeIcon}>
                        <Icon name={Platform.OS === 'ios' ? 'ios-close-circle-outline' : 'md-close-circle-outline'} style={{marginRight: 10}}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.flexrow}>
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
                </View>
        
                <View style={styles.flexrow}>
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
                        value={this.state.initiative}
                        onChangeText={(text) => this.updtInitiative(text)}
                        />
                    </Item>
                </View>

                <CheckBox
                    style={styles.checkboxpos}
                    onClick={()=>{ this.updtIsLeg() }}
                    isChecked={this.state.npc.legendary}
                    rightText={strings.common_titles.legend}
                    rightTextStyle={styles.checktext}
                    checkedCheckBoxColor= {styles.checkColor.color}
                    uncheckedCheckBoxColor= {styles.checkColor.color}
                />
                
                {this.state.npc.legendary ? 
                <View style={styles.flexrow}>
                    <Item floatingLabel style={styles.formItems}>
                        <Label>{strings.common_titles.legActions}</Label>
                        <Input
                        name={strings.common_titles.legActions}
                        type="number"
                        keyboardType="numeric"
                        value={this.state.npc.leg_actions}
                        onChangeText={(text) => this.updtLegAct(text)}
                        />
                    </Item>
                    <Item floatingLabel style={styles.formItems}>
                        <Label>{strings.common_titles.legResist}</Label>
                        <Input
                        name={strings.common_titles.legResist}
                        type="number"
                        keyboardType="numeric"
                        value={this.state.npc.leg_resist}
                        onChangeText={(text) => this.updtLegRes(text)}
                        />
                    </Item>
                </View>
                : <View/>}
                
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
        alignItems: 'flex-end',
        //backgroundColor: 'blue'
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

