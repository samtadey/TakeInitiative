import React from 'react';
import { View, Platform, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'native-base';

class AdventuringParty extends React.Component {
    constructor(props) {
        super(props);
        this.toPartyMembers = this.toPartyMembers.bind(this);
    }

    render() {
        return (
            <TouchableOpacity onPress={this.toPartyMembers}> 
                <View style={styles.adventurer_container}>
                    <View style={styles.flexrow}>
                        <View style={styles.party_image}>
                            <Image style={styles.photo} source={this.props.image}/>
                        </View>
                        <View style={styles.names}>
                            <View style={styles.flexrow}>
                                <Text style={styles.titles}>Party: </Text>
                                <Text>{this.props.party_name}</Text>
                            </View>
                            <View style={styles.flexrow}>
                                <Text style={styles.titles}>GM: </Text>
                                <Text>{this.props.gm_name}</Text>
                            </View>
                            <View style={styles.flexrow}>
                                <Text style={styles.titles}>Start Date: </Text>
                                <Text>{this.props.start_date}</Text>
                            </View>
                        </View>
                        {/* Edit Party */}
                        <TouchableOpacity style={styles.edit_icon} onPress={() => {this.props.editParty(this.props.party_name, this.props.gm_name, this.props.start_date)}}>
                            <Icon name={Platform.OS === 'ios' ? 'ios-create' : 'md-create'} style={styles.icon}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    toPartyMembers() {
        this.props.navigation.navigate('AdventurersScreen');
    }
}



const styles = StyleSheet.create({
    adventurer_container: {
        padding: 5,
        borderRadius: 1, 
        borderColor: 'black',
        height: 100, 
        marginBottom: 10,
        marginRight: 2,
        justifyContent: 'center',
        backgroundColor: '#F8F8F8',
    },
    party_image: {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    edit_icon: {
        display: 'flex',
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    names: {
        display: 'flex',
        flex: 3,
        justifyContent: 'center',
    },
    photo: {
        height: 75,
        width: 75,
    },
    flexrow: {
        flexDirection: 'row',
        display: 'flex',
    },
    titles: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    icon: {
        color: 'black'
    },
});

export default withNavigation(AdventuringParty)
