import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import PartyListItem from './PartyListItem';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});


const PartyList = ({ itemList }) => (
    <View style={styles.container}>
        <FlatList
                data={itemList}
                renderItem={({ item }) => <PartyListItem
                    name={item.name}
                    memberNo={item.memberNo}
                />}
        />
    </View>
);

export default PartyList;