import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        marginLeft:16,
        marginRight:16,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 5,
        backgroundColor: '#add8e6',
        elevation: 2,
    },
    title: {
        fontSize: 16,
        color: '#000',
    },
    container_text: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 12,
        justifyContent: 'center',
    },
    initiative: {
        fontSize: 36,
        fontWeight: 'bold',
    },
    player_class: {
      fontSize: 14,
      fontStyle: 'italic',
    },
    photo: {
        height: 50,
        width: 50,
    },
});


const PartyMember = ({ name, adv_class, level, race }) => (
    <View onPress={this.viewParty} style={styles.container}>
        <View style={styles.container_text}>
            <Text style={styles.title}>
                Name: {name}
            </Text>
            <Text style={styles.player_class}>
                Level: {level}
            </Text>
            <Text style={styles.player_class}>
                Class: {adv_class}
            </Text>
            <Text style={styles.player_class}>
                Race: {race}
            </Text>
        </View>
    </View>
);

export default PartyMember;