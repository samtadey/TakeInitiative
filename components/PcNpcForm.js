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
            adventurers: [],
        };
        this.deleteFormItem = this.deleteFormItem.bind(this);

        this.updtName = this.updtName.bind(this);
        this.updtType = this.updtType.bind(this);
        this.updtInitiative = this.updtInitiative.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
          this.setState({
            npc: this.props.npc
          })
        }
    }

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
    
    updtInitiative(text) {
        let npc = this.state.npc;
        npc.initiative = text;
        this.setState({npc: npc});
        this.props.updateForm(this.props.id, npc);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.closeIconRow}>

                    <ModalSelector
                        data={this.state.adventurers}
                        style={styles.modalselector}
                        initValue={strings.create_encounter_form.adventurerFormName}
                        // onChange={(option)=>{ this.updtName(option.label) }} />
                        onChange={(option)=>{ this.updtName(option.label) }} />

                    <TouchableOpacity onPress={this.deleteFormItem} style={styles.closeIcon}>
                        <Icon name={Platform.OS === 'ios' ? 'ios-close-circle-outline' : 'md-close-circle-outline'} style={{marginRight: 10}}/>
                    </TouchableOpacity>

                </View>

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
        alignItems: 'flex-end',
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
