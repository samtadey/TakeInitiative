import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import { Item, Label, Input, Icon } from 'native-base';
import strings from '../constants/Strings';
import PropTypes from 'prop-types';
import NPC from '../classes/NPC';
import unit_forms from '../functions/unit_forms';

export default class MonsterNpcForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            npc: new NPC(),
            monsters: [],
        };
        this.deleteFormItem = this.deleteFormItem.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id || this.props.monster !== prevProps.monster) {
          this.setState({
            npc: this.props.monster
          })
        }
    }

    deleteFormItem() {
        this.props.del(this.props.id, "npcs")
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.closeIconRow}>
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
                    onChangeText={(text) => unit_forms.updateSelf(this.state.npc, this.props.id, "name", text, "npcs", this.props.updt)}
                    />
                </Item>

                <Item floatingLabel style={styles.formItems}>
                    <Label>{strings.common_titles.type}</Label>
                    <Input
                    name={strings.common_titles.type}
                    type="text"
                    value={this.state.npc.type}
                    onChangeText={(text) => unit_forms.updateSelf(this.state.npc, this.props.id, "type", text, "npcs", this.props.updt)}
                    />
                </Item>
        
                <Item floatingLabel style={styles.formItems}>
                    <Label>{strings.common_titles.health}</Label>
                    <Input
                    name={strings.common_titles.health}
                    type="number"
                    keyboardType="numeric"
                    value={this.state.npc.health}
                    onChangeText={(text) => unit_forms.updateSelf(this.state.npc, this.props.id, "health", text, "npcs", this.props.updt)}
                    />
                </Item>
                <Item floatingLabel style={styles.formItems}>
                    <Label>{strings.common_titles.initiative}</Label>
                    <Input
                    name={strings.common_titles.initiative}
                    type="number"
                    keyboardType="numeric"
                    value={this.state.npc.initiative}
                    onChangeText={(text) => unit_forms.updateSelf(this.state.npc, this.props.id, "initiative", text, "npcs", this.props.updt)}
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

