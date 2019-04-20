import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import PartyMember from './PartyMember';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});


const PartyMemberList = ({ itemList }) => (
    <View style={styles.container}>
        <FlatList
                data={itemList}
                renderItem={({ item }) => <PartyMember
                    name={item.name}
                    adv_class={item.adv_class}
                    race={item.race}
                    level={item.level}
                />}
        />
    </View>
);

export default PartyMemberList;