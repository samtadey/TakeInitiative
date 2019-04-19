import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import CombatantListItem from './CombatantListItem';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});


const CombatantList = ({ itemList }) => (
    <View style={styles.container}>
        <FlatList
                data={itemList}
                renderItem={({ item }) => <CombatantListItem
                    name={item.name}
                    player_class={item.player_class}
                    initiative={item.initiative}
                />}
            />

    </View>
);

export default CombatantList;