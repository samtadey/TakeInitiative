import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform, AsyncStorage} from 'react-native';
import { Item, Label, Input, Icon } from 'native-base';
import strings from '../constants/Strings';
import ModalSelector from 'react-native-modal-selector';
import NPC from '../classes/NPC';
import unit_forms from '../functions/unit_forms';

export default class PcNpcForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            npc: new NPC(),
            adventurers: [],
        };

        getAdventurers = async () => {
            let adv = JSON.parse(await AsyncStorage.getItem(strings.keys.adventurers));
            let preppedAdv = [];

            for (let i = 0; i < adv.length; i++)
                preppedAdv.push({key: i, label: adv[i].name, type: adv[i].type, race: adv[i].race, img_key: adv[i].img_key});
            //need the key/label relationship

            //return preppedAdv;
            this.setState({adventurers: preppedAdv});
        }

        //didn't work in the other format up above
        this.deleteFormItem = this.deleteFormItem.bind(this);
        this.updtAll = this.updtAll.bind(this);
    }

    componentDidMount() {
        getAdventurers();
    }

    //update form when other form gets deleted in the CEM
    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id || this.props.npc !== prevProps.npc) {
          this.setState({
            npc: this.props.npc
          })
        }
    }

    //can't have props.del in render ==> updating error
    deleteFormItem() {
       this.props.del(this.props.id, "adventurers");
    }

    

    updtAll(npc, name, type, race, img) {
        npc.type = type;
        npc.race = race;
        npc.img_key = img;

        unit_forms.updateSelf(npc, this.props.id, "name", name, "adventurers", this.props.updt)
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.closeIconRow}>

                    <ModalSelector
                        data={this.state.adventurers}
                        style={styles.modalselector}
                        initValue={this.state.npc.name ? this.state.npc.name : strings.create_encounter_form.adventurerFormName}
                        onChange={(option)=>{ this.updtAll(this.state.npc, option.label, option.type, option.race, option.img_key) }} />

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
                    onChangeText={(text) => unit_forms.updateSelf(this.state.npc, this.props.id, "name", text, "adventurers", this.props.updt)}
                    />
                </Item>

                <Item floatingLabel style={styles.formItems}>
                    <Label>{strings.common_titles.type}</Label>
                    <Input
                    name={strings.common_titles.type}
                    type="text"
                    value={this.state.npc.type}
                    onChangeText={(text) => unit_forms.updateSelf(this.state.npc, this.props.id, "type", text, "adventurers", this.props.updt)}
                    />
                </Item>
        
                <Item floatingLabel style={styles.formItems}>
                    <Label>{strings.common_titles.initiative}</Label>
                    <Input
                    name={strings.common_titles.initiative}
                    type="number"
                    keyboardType="numeric"
                    value={this.state.npc.initiative}
                    onChangeText={(text) => unit_forms.updateSelf(this.state.npc, this.props.id, "initiative", text, "adventurers", this.props.updt)}
                    />
                </Item>
            </View>
        );
    }
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

