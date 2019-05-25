import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default class AddEditAdventurerModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }

    render() {
        return (
            <View style={styles.adventurer_container}>
                <Modal
                  isVisible={this.state.clearcart}
                  onBackdropPress={() => this.setState({ close: false })}>

                    
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    adventurer_container: {
        padding: 5,
        borderRadius: 5, 
        borderColor: '#7D7D7D', 
        borderWidth: 5,
        height: 100, 
        marginBottom: 10,
        justifyContent: 'center',
        backgroundColor: '#F8F8F8',
    },
});

