import React from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import { Item, Label, Input, Button } from 'native-base';
import strings from '../constants/Strings';
import Modal from "react-native-modal";

export default class MonsterNpcForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: null,
            type: null,
            total_health: null,
            initiative: null,
            is_legendary: false,
            leg_res: null,
            leg_actions: null,
        };
      }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.flexrow}>
                    <Item floatingLabel style={styles.formItems}>
                        <Label>{strings.common_titles.name}</Label>
                        <Input
                        name={strings.common_titles.name}
                        type="text"
                        value={this.state.name}
                        onChangeText={(text) => this.setState({name: text})}
                        />
                    </Item>
                    <Item floatingLabel style={styles.formItems}>
                        <Label>{strings.common_titles.type}</Label>
                        <Input
                        name={strings.common_titles.type}
                        type="text"
                        value={this.state.type}
                        onChangeText={(text) => this.setState({type: text})}
                        />
                    </Item>
                </View>
                <View style={styles.flexrow}>
                    <Item floatingLabel style={styles.formItems}>
                        <Label>{strings.common_titles.health}</Label>
                        <Input
                        name={strings.common_titles.health}
                        type="text"
                        value={this.state.total_health}
                        onChangeText={(text) => this.setState({total_health: text})}
                        />
                    </Item>
                    <Item floatingLabel style={styles.formItems}>
                        <Label>{strings.common_titles.initiative}</Label>
                        <Input
                        name={strings.common_titles.initiative}
                        type="text"
                        value={this.state.initiative}
                        onChangeText={(text) => this.setState({initiative: text})}
                        />
                    </Item>
                </View>
                
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
    flexrow: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
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
    formInput:{
      borderColor:'#CAECE4',
      height: 60,       
    },
    spacing: {
        marginBottom: 10,
        borderRadius: 5,
    },
  })

